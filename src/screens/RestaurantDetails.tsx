import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import ParallaxScrollView from "@/src/components/restaurantDetails/ParallaxScrollView";
import Colors from "@/constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSharedValue, withTiming } from 'react-native-reanimated';
import CategoryScrollView from "@/src/components/restaurantDetails/CategoryScrollVIew";
import StartRating from "@/src/components/restaurantDetails/StartRating";
import DeliveryView from "@/src/components/restaurantDetails/DeliveryView";
import { useRestaurantStore } from "@/src/zustand/restaurantStore";
import { Delivery } from "@/src/interface/delivery";
import ModalInfo from "@/src/components/restaurantDetails/ModalInfo";
import { Restaurant } from "@/src/interface/restaurant";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/src/zustand/cartStore";

const RestaurantDetails = () => {
    const route = useRoute();
    const { restaurantId } = route.params;
    const navigation = useNavigation();
    const opacity = useSharedValue(0);
    const restaurants = useRestaurantStore(state => state.restaurants);
    const [isInfoVisible, setInfoVisible] = useState(false);
    const { t } = useTranslation();
    const currentPrice = useCartStore(state => state.getRestaurantCart(restaurantId).currentPrice);

    const restaurant = restaurants.find(r => r.restaurantId === restaurantId);

    const goToBasket = () => {
        navigation.navigate('Basket', { restaurant: restaurant });
    };

    const toggleInfoModal = () => {
        setInfoVisible(prevState => !prevState);
    };

    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y > 350) {
            opacity.value = withTiming(1);
        } else {
            opacity.value = withTiming(0);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'white',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                    <Ionicons name="arrow-back" size={27} color={Colors.iconOrange} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name="share-outline" size={27} color={Colors.iconOrange} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <ParallaxScrollView
                backgroundColor={Colors.primary}
                style={{ flex: 1 }}
                scrollEvent={onScroll}
                parallaxHeaderHeight={250}
                renderBackground={() => <Image source={{ uri: restaurant?.imageUrl }} style={{ width: '100%', height: '100%' }} />}
                stickyHeaderHeight={110}
                contentBackgroundColor={Colors.lightGrey}
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>{restaurant?.name}</Text>
                    </View>
                )}
            >
                <View style={styles.detailsContainer}>
                    <View style={styles.info}>
                        <Image source={{ uri: restaurant?.logoUrl }} style={styles.logo} />
                        <StartRating rating={restaurant?.rating} showRating={true} />
                        <View style={styles.info}>
                            <TouchableOpacity style={styles.infoItem} onPress={toggleInfoModal}>
                                <FontAwesome name="info" size={24} color={'#1e1e1e'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.infoItem}>
                                <FontAwesome name="heart-o" size={24} color={'#1e1e1e'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <DeliveryView delivery={restaurant?.delivery as Delivery} />
                    <CategoryScrollView />
                </View>
            </ParallaxScrollView>
            {currentPrice > 0 && (
                <TouchableOpacity style={styles.basketButton} onPress={goToBasket}>
                    <Ionicons name="cart-outline" size={27} color={'white'} />
                    <View style={styles.basketText}>
                        <Text style={styles.goToBasket}>{t('goToBasket')} | </Text>
                        <Text style={styles.goToBasket}> {currentPrice.toFixed(2)} zł</Text>
                    </View>
                </TouchableOpacity>
            )}
            <ModalInfo isVisible={isInfoVisible} onClose={toggleInfoModal} restaurant={restaurant as Restaurant} />
        </View>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#ffffff',
        paddingBottom: 70,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    infoItem: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 30,
        margin: 16,
    },
    stickySection: {
        marginLeft: 45,
        height: 100,
        justifyContent: 'flex-end',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    stickySectionText: {
        fontSize: 17,
        marginVertical: 12,
        marginHorizontal: 20,
        color: 'white',

    },
    restaurantName: {
        fontSize: 30,
        margin: 16,
    },
    restaurantDescription: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        color: Colors.medium,
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 40,
        margin: 16,
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 16,
        flexDirection: 'row',
    },
    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    dish: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dishText: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingVertical: 4,
    },
    stickySegments: {
        position: 'absolute',
        height: 50,
        left: 0,
        right: 0,
        top: 100,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingBottom: 4,
    },
    segmentsShadow: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentText: {
        color: Colors.primary,
        fontSize: 16,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentScrollview: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20,
        paddingBottom: 4,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    basketButton: {
        position: 'absolute',
        bottom: 30,
        width: '90%',
        maxHeight: 60,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: '5%',
    },
    basketText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    goToBasket: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RestaurantDetails;
