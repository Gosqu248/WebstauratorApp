import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useCartStore } from '@/src/zustand/cartStore';
import { useTranslation } from "react-i18next";
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const AddToBasket = ({ restaurantId, menu, visible, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const { t } = useTranslation();
  const [groupedAdditives, setGroupedAdditives] = useState({});
  const [selectedAdditives, setSelectedAdditives] = useState([]);
  const addToBasket = useCartStore(state => state.addToBasket);

  const translateY = new Animated.Value(0);

  useEffect(() => {
    if (menu.additives) {
      setGroupedAdditives(groupAdditivesByName(menu.additives));
    }
    calculatePrice();
  }, [menu, selectedAdditives, quantity]);

  const groupAdditivesByName = (additives) => {
    return additives.reduce((acc, additive) => {
      if (!acc[additive.name]) {
        acc[additive.name] = [];
      }
      acc[additive.name].push(additive);
      return acc;
    }, {});
  };

  const calculatePrice = () => {
    const additivesPrice = selectedAdditives.reduce((total, additive) => total + additive.price, 0);
    const totalPrice = (menu.price + additivesPrice) * quantity;
    setPrice(totalPrice);
  };

  const selectAdditive = (additive) => {
    const group = groupedAdditives[additive.name];
    setSelectedAdditives((prev) => prev.filter((a) => !group.includes(a)).concat(additive));
  };

  const isSelected = (additive) => {
    return selectedAdditives.some((a) => a.id === additive.id);
  };

  const allAdditiveGroupsSelected = () => {
    return Object.keys(groupedAdditives).every(group =>
        selectedAdditives.some(additive => groupedAdditives[group].includes(additive))
    );
  };

  const addQuantity = () => setQuantity(quantity + 1);
  const removeQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToBasket = () => {
    if (menu.additives && !allAdditiveGroupsSelected()) {
      Alert.alert(t('error'), t('errorOfAdditives'));
      return;
    }

    addToBasket(restaurantId, { menu, quantity, chooseAdditives: selectedAdditives });
    onClose();
  };

  const handleGesture = (event) => {
    const { translationY, translationX } = event.nativeEvent;

    // Zamknij modal przy wystarczającym przesunięciu w pionie lub poziomie
    if (translationY > 100 || translationX > 100) {
      onClose();
    } else {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
          <PanGestureHandler
              onGestureEvent={Animated.event(
                  [{ nativeEvent: { translationY: translateY, translationX: new Animated.Value(0) } }],
                  { useNativeDriver: true }
              )}
              onHandlerStateChange={(event) => {
                if (event.nativeEvent.state === State.END) {
                  handleGesture(event);
                }
              }}
          >
            <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
              <View style={styles.topContainer}>
                <View style={styles.dragIndicator} />
                <Text style={styles.nameText}>{menu.name}</Text>
                <Text>{menu.ingredients}</Text>
                <Text style={styles.priceText}>{menu.price?.toFixed(2)} zł</Text>
              </View>

              {menu.additives?.length > 0 && (
                  <View style={styles.additivesView}>
                    <ScrollView>
                      {Object.keys(groupedAdditives).map((additiveName) => (
                          <View key={additiveName} style={styles.additiveGroup}>
                            <Text style={styles.additiveGroupName}>{additiveName}</Text>
                            {groupedAdditives[additiveName].map((additive) => (
                                <TouchableOpacity
                                    key={additive.id}
                                    style={[styles.additiveItem, isSelected(additive) && styles.selectedAdditive]}
                                    onPress={() => selectAdditive(additive)}
                                >
                                  <View style={styles.additiveItemContent}>
                                    <View style={styles.additiveLeftContainer}>
                                      <Text>{additive.value}</Text>
                                      {additive.price > 0 && (
                                          <Text style={styles.additivePrice}>(+ {additive.price.toFixed(2)} zł)</Text>
                                      )}
                                    </View>
                                    <View style={styles.additiveRightContent}>
                                      {isSelected(additive) && <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />}
                                    </View>
                                  </View>
                                </TouchableOpacity>
                            ))}
                          </View>
                      ))}
                    </ScrollView>
                  </View>
              )}

              <View style={styles.bottomContainer}>
                <View style={styles.quantityView}>
                  <TouchableOpacity onPress={removeQuantity} style={{ padding: 5 }}>
                    <Ionicons name={'remove'} size={25} color={'#8a8a8a'} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity onPress={addQuantity} style={{ padding: 5 }}>
                    <Ionicons name={'add'} size={25} color={'#8a8a8a'} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleAddToBasket}>
                  <Text style={styles.buttonText}>{price.toFixed(2)} zł</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </TouchableOpacity>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    minHeight: '25%',
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
  },
  topContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dad8d8',
    borderRadius: 5,
  },
  button: {
    width: '45%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  additivesView: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    padding: 20,
    maxHeight: 600,
  },
  additiveGroup: {
    marginBottom: 10,
  },
  additiveGroupName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  additiveItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedAdditive: {
    borderColor: Colors.primary,
  },
  additiveItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  additiveLeftContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  additiveRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  additivePrice: {
    marginLeft: 10,
  },
  quantityText: {
    fontSize: 16,
  },
});

export default AddToBasket;
