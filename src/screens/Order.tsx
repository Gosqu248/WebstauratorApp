import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import React, {useLayoutEffect} from 'react'
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import DeliveryAddress from "@/src/components/order/DeliveryAddress";
import SelectHour from "@/src/components/order/SelectHour";
import {useCurrentRestaurantStore} from "@/src/zustand/currentRestaurant";
import {useRestaurantStore} from "@/src/zustand/restaurantStore";

export default function Order() {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const restaurantId = useCurrentRestaurantStore(state => state.currentRestaurant);
    const restaurant = useRestaurantStore(state => state.getRestaurantById(restaurantId));


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
        <View style={styles.container}>
            <DeliveryAddress></DeliveryAddress>
            <SelectHour delivery={restaurant?.delivery}></SelectHour>

        </View>
    )
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
        flex: 1,
        alignItems: 'center',
    },
});
