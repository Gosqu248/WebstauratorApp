import { useEffect, useState } from 'react';
import {View, StyleSheet, Text, FlatList, Button, ScrollView, TouchableOpacity} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import config from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import '@/src/language/i18n';
import {Picker} from '@react-native-picker/picker';
import RestaurantList from '../components/home/RestaurantList';  // New component for displaying restaurants

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<any>;
};

type Restaurant = {
    category: string;
    deliveryPrice: number;
    distance: number;
    lat: number;
    lon: number;
    name: string;
    pickup: boolean;
    rating: number;
    restaurantId: number;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'delivery' | 'pickup'>('all');  // Filter state
    const { t, i18n } = useTranslation();

    const fetchRestaurantData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get<Restaurant[]>(
                `${config.backendUrl}/restaurantAddress/search?address=33-100`
            );

            setRestaurants(response.data); // Store the restaurant data
            setFilteredRestaurants(response.data); // Set the filtered restaurants to the full list initially
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    // Filter the restaurants based on the selected filter
    useEffect(() => {
        if (filter === 'delivery') {
            setFilteredRestaurants(restaurants.filter((restaurant) => !restaurant.pickup));
        } else if (filter === 'pickup') {
            setFilteredRestaurants(restaurants.filter((restaurant) => restaurant.pickup));
        } else {
            setFilteredRestaurants(restaurants); // Show all restaurants
        }
    }, [filter, restaurants]);

    const renderContent = () => {
        if (isLoading) {
            return <Text style={styles.loadingText}>{t('loading')}</Text>;
        }

        if (error) {
            return <Text style={styles.error}>{error}</Text>;
        }

        return <RestaurantList restaurants={filteredRestaurants} />;
    };

    return (

        <LinearGradient
            colors={['#FFA500', '#f5f551', '#fa3a3a']}
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
        marginBottom: 5,
    },
    filterPicker: {
        height: 50,
        width: '100%',
    },
    loadingText: {
        color: '#000',
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
});
