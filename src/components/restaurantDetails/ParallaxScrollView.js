import React, { Component } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { bool, func, number, string } from 'prop-types';

const window = Dimensions.get('window');

const pivotPoint = (a, b) => a - b;

const renderEmpty = () => <View />;

const noRender = () => <View style={{ display: 'none' }} />;

// Override `toJSON` of interpolated value because of
// an error when serializing style on view inside inspector.
const interpolate = (value, opts) => {
  const x = value.interpolate(opts);
  x.toJSON = () => x.__getValue();
  return x;
};

// Properties accepted by `ParallaxScrollView`.
const IPropTypes = {
  backgroundColor: string,
  backgroundScrollSpeed: number,
  fadeOutForeground: bool,
  fadeOutBackground: bool,
  contentBackgroundColor: string,
  onChangeHeaderVisibility: func,
  parallaxHeaderHeight: number.isRequired,
  renderBackground: func,
  renderContentBackground: func,
  renderFixedHeader: func,
  renderForeground: func,
  renderScrollComponent: func,
  renderStickyHeader: func,
  stickyHeaderHeight: number,
  contentContainerStyle: ViewPropTypes.style,
  outputScaleValue: number,
};

class ParallaxScrollView extends Component {
  constructor(props) {
    super(props);
    if (props.renderStickyHeader && !props.stickyHeaderHeight) {
      console.warn('Property `stickyHeaderHeight` must be set if `renderStickyHeader` is used.');
    }
    if (props.renderParallaxHeader !== renderEmpty && !props.renderForeground) {
      console.warn('Property `renderParallaxHeader` is deprecated. Use `renderForeground` instead.');
    }
    this.state = {
      scrollY: new Animated.Value(0),
      viewHeight: window.height,
      viewWidth: window.width,
    };
    this.scrollY = new Animated.Value(0);
    this._footerComponent = { setNativeProps() {} }; // Initial stub
    this._footerHeight = 0;

    // Replace string refs with createRef
    this.scrollViewRef = React.createRef();
  }

  // Update ScrollView calls to use the ref correctly
  getScrollResponder() {
    return this.scrollViewRef.current?.getScrollResponder();
  }

  getScrollableNode() {
    return this.getScrollResponder()?.getScrollableNode();
  }

  getInnerViewNode() {
    return this.getScrollResponder()?.getInnerViewNode();
  }

  scrollTo(...args) {
    this.getScrollResponder()?.scrollTo(...args);
  }

  setNativeProps(props) {
    this.scrollViewRef.current?.setNativeProps(props);
  }

  render() {
    const {
      backgroundColor,
      backgroundScrollSpeed,
      children,
      contentBackgroundColor,
      fadeOutForeground,
      fadeOutBackground,
      parallaxHeaderHeight,
      renderBackground,
      renderContentBackground,
      renderFixedHeader,
      renderForeground,
      renderParallaxHeader,
      renderScrollComponent,
      renderStickyHeader,
      stickyHeaderHeight,
      style,
      contentContainerStyle,
      outputScaleValue,
      ...scrollViewProps
    } = this.props;

    const background = this._renderBackground({
      fadeOutBackground,
      backgroundScrollSpeed,
      backgroundColor,
      parallaxHeaderHeight,
      stickyHeaderHeight,
      renderBackground,
      outputScaleValue,
    });
    const foreground = this._renderForeground({
      fadeOutForeground,
      parallaxHeaderHeight,
      stickyHeaderHeight,
      renderForeground: renderForeground || renderParallaxHeader,
    });
    const bodyComponent = this._wrapChildren(children, {
      contentBackgroundColor,
      stickyHeaderHeight,
      renderContentBackground,
      contentContainerStyle,
    });
    const footerSpacer = this._renderFooterSpacer({ contentBackgroundColor });
    const maybeStickyHeader = this._maybeRenderStickyHeader({
      parallaxHeaderHeight,
      stickyHeaderHeight,
      backgroundColor,
      renderFixedHeader,
      renderStickyHeader,
    });
    const scrollElement = renderScrollComponent(scrollViewProps);

    return (
        <View style={[style, styles.container]} onLayout={(e) => this._maybeUpdateViewDimensions(e)}>
          {background}
          {React.cloneElement(
              scrollElement,
              {
                ref: this.scrollViewRef, // Replace string ref with createRef
                style: [styles.scrollView, scrollElement.props.style],
                scrollEventThrottle: 1,
                onScroll: Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                    { useNativeDriver: true, listener: this._onScroll.bind(this) }
                ),
              },
              foreground,
              bodyComponent,
              footerSpacer
          )}
          {maybeStickyHeader}
        </View>
    );
  }

  _onScroll(e) {
    const { parallaxHeaderHeight, stickyHeaderHeight, onChangeHeaderVisibility, onScroll: prevOnScroll = () => {} } = this.props;
    this.props.scrollEvent && this.props.scrollEvent(e);
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);

    if (e.nativeEvent.contentOffset.y >= p) {
      onChangeHeaderVisibility(false);
    } else {
      onChangeHeaderVisibility(true);
    }

    prevOnScroll(e);
  }

  _maybeUpdateViewDimensions(e) {
    const {
      nativeEvent: {
        layout: { width, height },
      },
    } = e;

    if (width !== this.state.viewWidth || height !== this.state.viewHeight) {
      this.setState({
        viewWidth: width,
        viewHeight: height,
      });
    }
  }

  _renderBackground({ fadeOutBackground, backgroundScrollSpeed, backgroundColor, parallaxHeaderHeight, stickyHeaderHeight, renderBackground, outputScaleValue }) {
    const { viewWidth, viewHeight } = this.state;
    const { scrollY } = this;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
        <Animated.View
            style={[
              styles.backgroundImage,
              {
                backgroundColor: backgroundColor,
                height: parallaxHeaderHeight,
                width: viewWidth,
                opacity: fadeOutBackground
                    ? interpolate(scrollY, {
                      inputRange: [0, p * (1 / 2), p * (3 / 4), p],
                      outputRange: [1, 0.3, 0.1, 0],
                      extrapolate: 'clamp',
                    })
                    : 1,
                transform: [
                  {
                    translateY: interpolate(scrollY, {
                      inputRange: [0, p],
                      outputRange: [0, -(p / backgroundScrollSpeed)],
                      extrapolateRight: 'extend',
                      extrapolateLeft: 'clamp',
                    }),
                  },
                  {
                    scale: interpolate(scrollY, {
                      inputRange: [-viewHeight, 0],
                      outputRange: [outputScaleValue * 1.5, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
          <View>{renderBackground()}</View>
        </Animated.View>
    );
  }

  _renderForeground({ fadeOutForeground, parallaxHeaderHeight, stickyHeaderHeight, renderForeground }) {
    const { scrollY } = this;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
        <View style={styles.parallaxHeaderContainer}>
          <Animated.View
              style={[
                styles.parallaxHeader,
                {
                  height: parallaxHeaderHeight,
                  opacity: fadeOutForeground
                      ? interpolate(scrollY, {
                        inputRange: [0, p * (1 / 2), p * (3 / 4), p],
                        outputRange: [1, 0.3, 0.1, 0],
                        extrapolate: 'clamp',
                      })
                      : 1,
                },
              ]}>
            <View style={{ height: parallaxHeaderHeight }}>{renderForeground()}</View>
          </Animated.View>
        </View>
    );
  }

  _wrapChildren(children, { contentBackgroundColor, stickyHeaderHeight, contentContainerStyle, renderContentBackground }) {
    const { viewHeight } = this.state;
    const containerStyles = [{ backgroundColor: contentBackgroundColor }];

    if (contentContainerStyle) containerStyles.push(contentContainerStyle);

    this.containerHeight = this.state.viewHeight;

    React.Children.forEach(children, (item) => {
      if (item && Object.keys(item).length !== 0) {
        this.containerHeight = 0;
      }
    });

    return (
        <View
            style={[containerStyles, { minHeight: this.containerHeight }]}
            onLayout={(e) => {
              const {
                nativeEvent: {
                  layout: { height },
                },
              } = e;
              const footerHeight = Math.max(0, viewHeight - height - stickyHeaderHeight);
              if (this._footerHeight !== footerHeight) {
                this._footerComponent.setNativeProps({
                  style: { height: footerHeight },
                });
                this._footerHeight = footerHeight;
              }
            }}>
          {renderContentBackground()}
          {children}
        </View>
    );
  }

  _renderFooterSpacer({ contentBackgroundColor }) {
    return (
        <View
            ref={(ref) => {
              if (ref) {
                this._footerComponent = ref;
              }
            }}
            style={{ backgroundColor: contentBackgroundColor }}
        />
    );
  }

  _maybeRenderStickyHeader({ parallaxHeaderHeight, stickyHeaderHeight, backgroundColor, renderFixedHeader, renderStickyHeader }) {
    const { viewWidth } = this.state;
    const { scrollY } = this;
    if (renderStickyHeader || renderFixedHeader) {
      const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
      return (
          <View
              style={[
                styles.stickyHeader,
                {
                  width: viewWidth,
                  ...(stickyHeaderHeight ? { height: stickyHeaderHeight } : null),
                },
              ]}>
            {renderStickyHeader ? (
                <Animated.View
                    style={{
                      backgroundColor: backgroundColor,
                      height: stickyHeaderHeight,
                      opacity: interpolate(scrollY, {
                        inputRange: [0, p],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                      }),
                    }}>
                  <Animated.View
                      style={{
                        transform: [
                          {
                            translateY: interpolate(scrollY, {
                              inputRange: [0, p],
                              outputRange: [stickyHeaderHeight, 0],
                              extrapolate: 'clamp',
                            }),
                          },
                        ],
                      }}>
                    {renderStickyHeader()}
                  </Animated.View>
                </Animated.View>
            ) : null}
            {renderFixedHeader && renderFixedHeader()}
          </View>
      );
    } else {
      return null;
    }
  }
}

ParallaxScrollView.propTypes = IPropTypes;

ParallaxScrollView.defaultProps = {
  backgroundScrollSpeed: 5,
  backgroundColor: '#000',
  contentBackgroundColor: '#fff',
  fadeOutForeground: true,
  onChangeHeaderVisibility: () => {},
  renderScrollComponent: (props) => <Animated.ScrollView {...props} />,
  renderBackground: renderEmpty,
  renderContentBackground: noRender,
  renderParallaxHeader: renderEmpty, // Deprecated (will be removed in 0.18.0)
  renderForeground: null,
  stickyHeaderHeight: 0,
  contentContainerStyle: null,
  outputScaleValue: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  parallaxHeaderContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  parallaxHeader: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    top: 0,
  },
  stickyHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
});

export default ParallaxScrollView;
