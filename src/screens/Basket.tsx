import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCartStore } from "@/src/zustand/cartStore";
import { OrderMenu } from "@/src/interface/orderMenu";
import OrderMenuItem from "@/src/components/basket/OrderMenuItem";
import DeliveryView from "@/src/components/restaurantDetails/DeliveryView";
import { Delivery } from "@/src/interface/delivery";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useDeliveryStore } from "@/src/zustand/delivery";

const Basket = () => {
    const { t } = useTranslation();
    const route = useRoute();
    const { restaurant } = route.params;
    const navigation = useNavigation();
    const serviceFee = 2;
    const deliveryType = useDeliveryStore(state => state.deliveryType);

    if (!restaurant) {
        return <Text>{t('Restaurant not found')}</Text>;
    }

    const basket = useCartStore(state => state.getRestaurantCart(restaurant.restaurantId).basket);
    const subTotal = useCartStore(state => state.getRestaurantCart(restaurant.restaurantId).currentPrice);
    const total = subTotal + serviceFee + (deliveryType === 'delivery' ? restaurant.delivery.deliveryPrice : 0);
    const missingPrice = restaurant.delivery.minimumPrice - subTotal;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: t('basket'),
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <DeliveryView delivery={restaurant.delivery as Delivery} />
            <FlatList
                data={basket}
                keyExtractor={(item, index) => `${item.menu.id}-${index}`}
                renderItem={({ item }) => (
                    <OrderMenuItem
                        orderMenu={item}
                        restaurantId={restaurant.restaurantId}
                    />
                )}
            />

            <View style={styles.priceContainer}>
                <View style={styles.priceItem}>
                    <Text style={{color: '#444343'}}>{t('together')} </Text>
                    <Text style={{color: '#444343'}}>{subTotal.toFixed(2)} zł</Text>
                </View>
                {deliveryType === 'delivery' && (
                    <View style={styles.priceItem}>
                        <Text style={{color: '#444343'}}>{t('deliveryCost')} </Text>
                        <Text style={{color: '#444343'}}>{restaurant.delivery.deliveryPrice.toFixed(2)} zł</Text>
                    </View>
                )}
                <View style={styles.priceItem}>
                    <Text style={{color: '#444343'}}>{t('serviceFee')} </Text>
                    <Text style={{color: '#444343'}}>{serviceFee.toFixed(2)} zł</Text>
                </View>
                <View style={styles.priceItem}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{t('total')} </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{total.toFixed(2)} zł</Text>
                </View>

                { missingPrice > 0  && (
                    <View style={styles.lackPriceContainer}>
                        <Text> {t('minimumOrder')} </Text>
                        <Text> {missingPrice.toFixed(2)} zł </Text>
                    </View>
                )

                }

            </View>

            <View style={styles.buttonContainer}>
                { subTotal > restaurant.delivery.minimumPrice
                    ? (
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.buttonText}>{t('goToCheckout')} | {total.toFixed(2)} zł</Text>
                        </TouchableOpacity>
                    )
                    : (
                        <TouchableOpacity style={styles.addMoreButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.addMoreText}>{t('addMoreProducts')}</Text>
                        </TouchableOpacity>
                    )

                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: 100,
        height: 50,
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
    },
    basketContainer: {
        padding: 10,
        maxHeight: 470,
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    lackPriceContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f5e7a5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,

    },
    orderButton: {
        backgroundColor: Colors.primary,
        padding: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    addMoreButton: {
        width: '100%',
        paddingBottom: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    addMoreText: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Basket;
