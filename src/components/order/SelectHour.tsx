import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useTranslation} from "react-i18next";
import Colors from "@/constants/Colors";
import {useDeliveryStore} from "@/src/zustand/delivery";
import {Delivery} from "@/src/interface/delivery";

const SelectHour = ({delivery}: {delivery: Delivery }) => {
    const {t} = useTranslation();
    const deliveryType = useDeliveryStore(state => state.deliveryType)


    return (
        <View style={styles.container}>
            { deliveryType === 'delivery' ? (
                <>
                    <Text style={styles.mainText}>{t('planDelivery')}</Text>
                    <TouchableOpacity >
                        <View style={styles.deliveryButton}>
                            <Text>{t('asSoonAsPossible')} ({delivery.deliveryMinTime}-{delivery.deliveryMaxTime} min)</Text>
                        </View>
                    </TouchableOpacity>

                </>
            ) : (
                <>
                    <Text style={styles.mainText}>{t('planPickUp')}</Text>
                    <TouchableOpacity >
                        <View style={styles.deliveryButton}>
                            <Text>{t('asSoonAsPossible')} ({delivery.pickupTime} min)</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity >
                <View style={styles.deliveryButton}>
                    <Text>{t('chooseHour')}</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    deliveryButton : {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 15,
        margin: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        flexDirection: 'row',
    }
})
export default SelectHour
