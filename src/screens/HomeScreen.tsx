import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import '@/src/language/i18n';
import RestaurantList from '../components/home/RestaurantList';
import { useRestaurantStore } from '@/src/zustand/restaurantStore';
import { useAddressEffect } from '@/src/hooks/useAddressEffect';
import { useDeliveryStore } from '@/src/zustand/delivery';
import LottieView from "lottie-react-native";
import Colors from "@/constants/Colors";

export function HomeScreen() {
    const { t } = useTranslation();
    const { restaurants, isLoading, error } = useRestaurantStore();
    const { deliveryType } = useDeliveryStore();
    const filteredRestaurants = restaurants.filter((restaurant) =>
        deliveryType === 'pickup' ? restaurant.pickup : true
    );

    useAddressEffect();

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <LottieView
                        source={require('@/assets/animations/Loading.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                </View>
            );
        }

        if (error || restaurants.length === 0) {
            return (
                <View style={styles.errorContainer}>
                    <LottieView
                        source={require('@/assets/animations/NoRestaurants.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                    <Text style={styles.error}>{t('errorOrNotFound')}</Text>
                </View>
            );
        }

        return (
            <>
                <Text style={styles.orderBY}>{t('order')} {filteredRestaurants.length} {t('restaurants')}</Text>
                <RestaurantList />
            </>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                {renderContent()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 10,
        backgroundColor: Colors.iconOrange,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {},
    orderBY: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    loadingText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    lottie: {
        width: 400,
        height: 400,
    },
});
