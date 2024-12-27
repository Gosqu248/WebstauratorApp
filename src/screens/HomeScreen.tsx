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
            );   ;
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
        <LinearGradient
            colors={['rgba(255, 165, 0, 0.5)', 'rgba(245, 245, 81, 0.5)', 'rgba(250, 58, 58, 0.5)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.filterContainer}>
                {renderContent()}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 10,
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
