import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import {FontAwesome} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {useNavigation} from "@react-navigation/native";
import {useRestaurantStore} from "@/src/zustand/restaurantStore";
import {Restaurant} from "@/src/interface/restaurant";
import {useDeliveryStore} from "@/src/zustand/delivery";

const RestaurantList = () => {
    const { t } = useTranslation();
    const { restaurants } = useRestaurantStore();
    const navigation = useNavigation();
    const { deliveryType } = useDeliveryStore();
    const filteredRestaurants = restaurants.filter((restaurant) =>
        deliveryType === 'pickup' ? restaurant.pickup : true
    );

    const RestaurantItem = ({ item }: { item: Restaurant }) => {
        const distance = item.distance > 1
            ? `${item.distance?.toFixed(1)} km`
            : `${(item.distance * 1000).toFixed(0)} m`;

        const goToRestaurant = () => {
            navigation.navigate('RestaurantDetails', {
                restaurantId: item.restaurantId,
            });
        };

        return (
            <TouchableOpacity onPress={goToRestaurant}>
                <View style={styles.restaurantCard}>
                    <View style={styles.imageContainer}>
                        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.restaurantImage} />}
                        {item.logoUrl && (
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: item.logoUrl }} style={styles.logo} />
                            </View>
                        )}
                        <View style={styles.ratingContainer}>
                            <FontAwesome name="star" size={16} color={Colors.iconOrange}/>
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.restaurantName}>{item.name}</Text>
                        <Text style={styles.category}>{item.category}</Text>
                        <View style={styles.bottomContainer}>
                            <View style={styles.option}>
                                <FontAwesome name="map-marker" size={16} color={Colors.iconOrange}/>
                                <Text style={styles.distance}>{distance}</Text>
                            </View>

                            <View style={styles.option}>
                                <FontAwesome name="money" size={16} color={Colors.iconOrange} />
                                <Text style={styles.distance}>Min. {item.delivery?.minimumPrice.toFixed(2)} zł</Text>
                            </View>

                            <View style={styles.option}>
                                <FontAwesome name="clock-o" size={16} color={Colors.iconOrange} />
                                <Text style={styles.distance}>{item.delivery?.deliveryMinTime} - {item.delivery?.deliveryMaxTime} min</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={filteredRestaurants}
            renderItem={({ item }) => <RestaurantItem item={item} />}
            keyExtractor={(item) => item.restaurantId.toString()}
        />
    );
};

const styles = StyleSheet.create({
    restaurantCard: {
        backgroundColor: 'rgba(255,255,255, 1)',
        borderRadius: 10,
        marginVertical: 8,
    },
    imageContainer: {
        position: 'relative',
    },
    restaurantImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    logoContainer: {
        position: 'absolute',
        bottom: -30,
        left: '-6%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 30,
    },
    logo: {
        width: 70,
        height: 50,
        marginLeft: 10,
        marginBottom: 20,
    },
    infoContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    restaurantName: {
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    ratingContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        padding: 5,
        borderRadius: 5,
        shadowColor: '#000',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#000',
    },
    category: {
        fontSize: 14,
        color: Colors.mediumDark,

    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distance: {
        marginLeft: 5,
        padding: 5,

        fontSize: 14,
        color: Colors.mediumDark,
    },

});
export default RestaurantList;
