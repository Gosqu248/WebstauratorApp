import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { useDeliveryStore } from '@/src/zustand/delivery';
import { Ionicons } from '@expo/vector-icons';
import {useTranslation} from "react-i18next";
import {useRestaurantStore} from "@/src/zustand/restaurantStore";
import {Delivery} from "@/src/interface/delivery";

const DeliveryView = ({ delivery }: { delivery: Delivery }) => {
    const { deliveryType, setDeliveryType } = useDeliveryStore();
    const { t } = useTranslation();

    console.log(delivery.deliveryMaxTime)
    return (
        <View style={styles.view}>
            <TouchableOpacity
                style={[
                    styles.deliveryOption,
                    deliveryType === 'delivery' ? styles.selectedOption : styles.unselectedOption
                ]}
                onPress={() => setDeliveryType('delivery')}
            >
                <Ionicons
                    name="car-outline"
                    size={24}
                    color={deliveryType === 'delivery' ? Colors.iconOrange : '#000'}
                />
                <View style={styles.deliveryTexts}>
                    <Text>{t('delivery')}</Text>
                    <Text>{delivery.deliveryMinTime} - {delivery.deliveryMaxTime} min</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.deliveryOption,
                    deliveryType === 'pickup' ? styles.selectedOption : styles.unselectedOption,
                    delivery.pickupTime === 0 && styles.disabledOption
                ]}
                onPress={() => delivery.pickupTime !== 0 && setDeliveryType('pickup')}
                disabled={delivery.pickupTime === 0}
            >
                <Ionicons
                    name="walk-outline"
                    size={24}
                    color={deliveryType === 'pickup' ? Colors.iconOrange : '#000'}
                />
                <View style={styles.deliveryTexts}>
                    <Text>{t('pickup')}</Text>
                    {
                        delivery.pickupTime !== 0
                            ? <Text>{delivery.pickupTime} min</Text>
                            : <></>
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        width: '96%',
        height: 50,
        padding: 4,
        backgroundColor: Colors.lightGrey,
        alignSelf: 'center',
    },
    deliveryOption: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        margin: 1,
    },
    selectedOption: {
        backgroundColor: '#fff',
    },
    unselectedOption: {
        backgroundColor: 'transparent',
    },
    disabledOption: {
        opacity: 0.5,
    },
    deliveryTexts: {
        marginLeft: 10,
    }
});

export default DeliveryView;
