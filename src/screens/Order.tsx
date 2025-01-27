import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import DeliveryAddress from "@/src/components/order/DeliveryAddress";
import SelectHour from "@/src/components/order/SelectHour";
import { useCurrentRestaurantStore } from "@/src/zustand/currentRestaurant";
import { useRestaurantStore } from "@/src/zustand/restaurantStore";
import PaymentMethod from "@/src/components/order/PaymentMethod";
import PersonalInfo from "@/src/components/order/PersonalInfo";
import AddComment from "@/src/components/order/AddComment";
import {useOrderStore} from "@/src/zustand/order";
import {Order, OrderStatus} from "@/src/interface/order";
import {useCartStore} from "@/src/zustand/cartStore";
import {useDeliveryStore} from "@/src/zustand/delivery";
import useAuthStore from "@/src/zustand/auth";
import {UserDTO} from "@/src/interface/user";
import {UserAddress} from "@/src/interface/userAddress";
import {createOrder} from "@/src/services/orderService";
import {RestaurantInfo} from "@/src/interface/restaurant";

export default function OrderScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const restaurantId = useCurrentRestaurantStore(state => state.currentRestaurant);
    const restaurant = useRestaurantStore(state => state.getRestaurantById(restaurantId));
    const deliveryAddress = useOrderStore(state => state.deliveryAddress)
    const deliveryHours = useOrderStore(state => state.selectedOption)
    const paymentMethod = useOrderStore(state => state.selectedPayment)
    const comment = useOrderStore(state => state.comment)
    const name = useOrderStore(state => state.name)
    const email = useOrderStore(state => state.email)
    const phone = useOrderStore(state => state.phone)
    const deliveryOption = useDeliveryStore(state => state.deliveryType)

    const isButtonDisabled = !deliveryAddress || !paymentMethod || !deliveryHours || !name || !email || !phone;

    const currentRestaurant = useCurrentRestaurantStore(state => state.currentRestaurant);
    const totalPrice = useCartStore(state => state.getRestaurantCart(currentRestaurant).currentPrice);
    const orderMenus = useCartStore(state => state.getRestaurantCart(currentRestaurant).basket);
    const user: UserDTO = useAuthStore(state => state.user);



    const handleOrder = async () => {
        const userData: UserDTO = {
            ...user,
            name: name,
            email: email,
        }
        const selectedAddress: UserAddress = {
            ...deliveryAddress,
            phoneNumber: phone,
        }
        const restaurantData: RestaurantInfo = {
            id: currentRestaurant,
            name: restaurant?.name ?? '',
            category: restaurant?.category,
            logo: restaurant.logoUrl,
            imageUrl: restaurant.imageUrl
        }


        const orderDetails: Order = {
            paymentMethod: paymentMethod,
            status: OrderStatus.niezaplcone,
            totalPrice: totalPrice,
            deliveryTime: deliveryHours,
            deliveryOption: deliveryOption,
            comment: comment,
            paymentId: null,
            user: userData,
            userAddress: selectedAddress,
            restaurant: restaurantData,
            orderMenus: orderMenus,
        };

        console.log('Order paymentent:', paymentMethod);
        console.log('Order details:', orderDetails.status);

        try {
            const response = await createOrder(orderDetails);
            navigation.goBack();
            console.log('Order created successfully:', response);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerTitle: t('order'),
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                        <Ionicons name="arrow-back" size={27} color={'white'} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <DeliveryAddress />
                <SelectHour delivery={restaurant?.delivery ?? {}} />
                <PaymentMethod paymentMethods={restaurant?.paymentMethods ?? []} />
                <AddComment />
                <PersonalInfo />
                <TouchableOpacity
                    style={[styles.button, isButtonDisabled && styles.disabledButton]}
                    onPress={handleOrder}
                >
                    <Text style={styles.buttonText}>{t('ordering')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: 100,
        height: 50,
        flexDirection: 'row',
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    button: {
        margin: 20,
        width: '80%',
        padding: 15,
        borderRadius: 8,
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    disabledButton: {
        backgroundColor: Colors.mediumDark, // Add transparency to indicate disabled state
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});
