import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SearchedRestaurant } from '@/src/interface/searchedRestaurant';
import axios from 'axios';
import config from '@/src/config';
import { ImageAndLogo } from '@/src/interface/imageAndLogo';
import {FontAwesome} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {Delivery} from "@/src/interface/delivery";
import {useNavigation} from "@react-navigation/native";

type RestaurantListProps = {
    restaurants: SearchedRestaurant[];
};

const RestaurantList = ({ restaurants }: RestaurantListProps) => {
    const { t } = useTranslation();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchRestaurantImageAndLogo = async (restaurantId: number) => {
        try {
            const response = await axios.get<ImageAndLogo>(
                `${config.backendUrl}/restaurant/getLogoAndImage?id=${restaurantId}`
            );
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const RestaurantItem = ({ item }: { item: SearchedRestaurant }) => {
        const [image, setImage] = useState<string | null>(null);
        const [logo, setLogo] = useState<string | null>(null);
        const [distance, setDistance] = useState<string | null>(null);
        const [delivery, setDelivery] = useState<Delivery | null>(null);
        const navigation = useNavigation();

        const fetchRestaurantImages = async () => {
            const urls = await fetchRestaurantImageAndLogo(item.restaurantId);
            if (urls) {
                setImage(urls.imageUrl);
                setLogo(urls.logoUrl);
            }
        };

        const fetchDelivery = async () => {
            const response = await axios.get<Delivery>(`${config.backendUrl}/delivery?restaurantId=${item.restaurantId}`);
            if (response) {
                setDelivery(response.data);
            } else {
                console.error('Error fetching delivery');
            }
        }

        const goToRestaurant = () => {
            navigation.navigate('RestaurantDetails', { restaurantId: item.restaurantId });
        }


        useEffect(() => {
            const fetchData = async () => {
                await fetchRestaurantImages();
                await fetchDelivery();
                const formattedDistance = item.distance > 1 ? `${item.distance.toFixed(1)} km` : `${(item.distance * 1000).toFixed(0)} m`;
                setDistance(formattedDistance);
                setIsDataLoaded(true);
            };
            fetchData();
        }, [item.restaurantId]);





        return (
            <TouchableOpacity onPress={goToRestaurant}>
                <View style={styles.restaurantCard}>
                    <View style={styles.imageContainer}>
                        {image && <Image source={{ uri: image }} style={styles.restaurantImage} />}
                        {logo && (
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: logo }} style={styles.logo} />
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
                                <Text style={styles.distance}>Min. {delivery?.minimumPrice.toFixed(2)} zł</Text>
                            </View>

                            <View style={styles.option}>
                                <FontAwesome name="clock-o" size={16} color={Colors.iconOrange} />
                                <Text style={styles.distance}>{delivery?.deliveryMinTime} - {delivery?.deliveryMaxTime} min</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    };

    return (
        <FlatList
            data={restaurants}
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
