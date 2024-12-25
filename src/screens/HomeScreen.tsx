import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import config from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import '@/src/language/i18n';
import RestaurantList from '../components/home/RestaurantList';
import {SearchedRestaurant} from "@/src/interface/searchedRestaurant";

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<any>;
};



export function HomeScreen({ navigation }: HomeScreenProps) {
    const [restaurants, setRestaurants] = useState<SearchedRestaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<SearchedRestaurant[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'delivery' | 'pickup'>('all');
    const [restaurantsQuantity, setRestaurantsQuantity] = useState<number>(0);

    const { t } = useTranslation();

    const fetchRestaurantData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get<SearchedRestaurant[]>(
                `${config.backendUrl}/restaurantAddress/search?address=33-100`,
            );

            setRestaurants(response.data);
            setFilteredRestaurants(response.data);
            setRestaurantsQuantity(response.data.length);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    useEffect(() => {
        if (filter === 'delivery') {
            setFilteredRestaurants(restaurants.filter((restaurant) => !restaurant.pickup));
        } else if (filter === 'pickup') {
            setFilteredRestaurants(restaurants.filter((restaurant) => restaurant.pickup));
        } else {
            setFilteredRestaurants(restaurants);
        }
    }, [filter, restaurants]);

    const renderContent = () => {
        if (isLoading) {
            return <Text style={styles.loadingText}>{t('loading')}</Text>;
        }

        if (error) {
            return <Text style={styles.loadingText}>{error}</Text>;
        }

        return (
            <>
                <Text style={styles.orderBY}>{t('order')}{restaurantsQuantity} {t('restaurants')}</Text>
                <RestaurantList restaurants={filteredRestaurants} />
            </>
        )
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
    filterContainer: {
    },
    orderBY: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    filterPicker: {
        height: 50,
        width: '100%',
    },
    loadingText: {
        color: '#000',
        fontSize: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
