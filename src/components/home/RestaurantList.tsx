import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

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

type RestaurantListProps = {
    restaurants: Restaurant[];
};

const RestaurantList = ({ restaurants }: RestaurantListProps) => {
    const { t } = useTranslation();

    const renderRestaurant = ({ item }: { item: Restaurant }) => {
        return (
            <View style={styles.restaurantCard}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text>{t('category')}: {item.category}</Text>
                <Text>{t('deliveryPrice')}: {item.deliveryPrice} PLN</Text>
                <Text>{t('distance')}: {item.distance} km</Text>
                <Text>{t('rating')}: {item.rating}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={restaurants}
            renderItem={renderRestaurant}
            keyExtractor={(item) => item.restaurantId.toString()}
        />
    );
};

const styles = StyleSheet.create({
    restaurantCard: {
        backgroundColor: '#ffffff80',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default RestaurantList;
