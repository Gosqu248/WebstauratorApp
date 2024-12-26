import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import ParallaxScrollView from "@/src/components/restaurantDetails/ParallaxScrollView";
import Colors from "@/constants/Colors";
import {useNavigation, useRoute} from "@react-navigation/native";
import axios from "axios";
import config from "@/src/config";
import {Restaurant} from "@/src/interface/restaurant";
import {Ionicons} from "@expo/vector-icons";
import RestaurantItems from "@/src/components/restaurantDetails/RestaurantItems";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CategoryScrollVIew from "@/src/components/restaurantDetails/CategoryScrollVIew";

const RestaurantDetails = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const route = useRoute();
    const { restaurantId } = route.params;
    const navigation = useNavigation();
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);
    const [categories, setCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const opacity = useSharedValue(0);

    const fetchRestaurantData = async () => {
        const response = await axios.get<Restaurant>(`${config.backendUrl}/restaurant/getRestaurant?id=${restaurantId}`);
        if (response) {
            setRestaurant(response.data);
        } else {
            console.error('Error fetching restaurant');
        }
    }

    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));


    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        selected.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'white',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                    <Ionicons name="arrow-back" size={27} color={Colors.iconOrange} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity  style={styles.roundButton}>
                        <Ionicons name="share-outline" size={27} color={Colors.iconOrange} />
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.roundButton}>
                        <Ionicons name="search-outline" size={27} color={Colors.iconOrange} />
                    </TouchableOpacity>
                </View>
            ),

        })
    }, []);

    useEffect(() => {
        fetchRestaurantData();
    }, []);



    return (
        <>
            <ParallaxScrollView backgroundColor={'#fff'}
                                style={{flex:1}}
                                parallaxHeaderHeight={250}
                                renderBackground={() => <Image source={{uri: restaurant?.imageUrl}} style={{width: `100%`, height: `100%`}}/>}
                                stickyHeaderHeight={100}
                                contentBackgroundColor={Colors.lightGrey}
                                renderStickyHeader={() => <View key="sticky-header" style={styles.stickySection}>
                                    <Text style={styles.stickySectionText}>{restaurant?.name}</Text>
                                </View>}
            >
                <View style={styles.detailsContainer}>
                    <RestaurantItems restaurantId={restaurantId} />
                </View>
            </ParallaxScrollView>
            <Animated.View style={[styles.stickySegments, animatedStyles]}>
                <CategoryScrollVIew></CategoryScrollVIew>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },
    stickySection: {
        backgroundColor: '#fff',
        marginLeft: 45,
        height: 100,
        justifyContent: 'flex-end',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    stickySectionText: {
        fontSize: 17,
        margin: 12,
    },
    restaurantName: {
        fontSize: 30,
        margin: 16,
    },
    restaurantDescription: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        color: Colors.medium,
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 40,
        margin: 16,
    },
    item: {
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
    },
    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    dish: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dishText: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingVertical: 4,
    },
    stickySegments: {
        position: 'absolute',
        height: 50,
        left: 0,
        right: 0,
        top: 100,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingBottom: 4,
    },
    segmentsShadow: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentText: {
        color: Colors.primary,
        fontSize: 16,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentScrollview: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20,
        paddingBottom: 4,
    },
});
export default RestaurantDetails
