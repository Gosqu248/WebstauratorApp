import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/Colors';
import { useDeliveryStore } from '@/src/zustand/delivery';
import { Delivery } from '@/src/interface/delivery';
import { useRestaurantStore } from '@/src/zustand/restaurantStore';
import { useCurrentRestaurantStore } from '@/src/zustand/currentRestaurant';
import {useSelectedOptionStore} from "@/src/zustand/selectedHour";

const SelectHour = ({ delivery }: { delivery: Delivery }) => {
    const { t } = useTranslation();
    const deliveryType = useDeliveryStore((state) => state.deliveryType);
    const currentRestaurant = useCurrentRestaurantStore((state) => state.currentRestaurant);
    const currentDeliveryHour = useRestaurantStore((state) =>
        state.getCurrentDeliveryHours(currentRestaurant)
    );
    const [showTimePicker, setShowTimePicker] = useState(false);
    const { selectedOption, setSelectedOption } = useSelectedOptionStore();


    const generateTimeSlots = () => {
        if (!currentDeliveryHour) return [];

        const timeToMinutes = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const openMinutes = timeToMinutes(currentDeliveryHour.openTime);
        const closeMinutes = timeToMinutes(currentDeliveryHour.closeTime);

        let earliestStart;
        if (currentMinutes > openMinutes) {
            earliestStart = currentMinutes + delivery.deliveryMaxTime;
        } else {
            earliestStart = openMinutes + delivery.deliveryMaxTime;
        }

        const nextSlot = Math.ceil(earliestStart / 15) * 15;
        let startMinutes = Math.max(nextSlot, openMinutes);

        if (startMinutes > closeMinutes) return [];

        const slots = [];
        let currentHour = Math.floor(startMinutes / 60);
        let currentMinute = startMinutes % 60;

        while (currentHour * 60 + currentMinute <= closeMinutes) {
            slots.push(
                `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
            );
            currentMinute += 15;
            if (currentMinute >= 60) {
                currentHour++;
                currentMinute %= 60;
            }
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <View style={styles.container}>
            {deliveryType === 'delivery' ? (
                <>
                    <Text style={styles.mainText}>{t('planDelivery')}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedOption('Jak najszybciej');
                        }}
                    >
                        <View
                            style={[
                                styles.deliveryButton,
                                selectedOption === 'Jak najszybciej' && styles.selectedOption,
                            ]}
                        >
                            <Text style={selectedOption === 'Jak najszybciej' && styles.selectedText}>{t('asSoonAsPossible')} ({delivery.deliveryMinTime}-{delivery.deliveryMaxTime} min)</Text>
                        </View>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.mainText}>{t('planPickUp')}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedOption('Jak najszybciej');
                        }}
                    >
                        <View
                            style={[
                                styles.deliveryButton,
                                selectedOption === 'Jak najszybciej' && styles.selectedOption,
                            ]}
                        >
                            <Text style={selectedOption === 'Jak najszybciej' && styles.selectedText}>{t('asSoonAsPossible')} ({delivery.pickupTime} min)</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )}

            <TouchableOpacity
                onPress={() => {
                    setShowTimePicker(!showTimePicker);
                }}
            >
                <View
                    style={[
                        styles.deliveryButton,
                        selectedOption !== 'Jak najszybciej' && selectedOption !== '' && styles.selectedOption,
                    ]}
                >
                    <Text style={selectedOption !== 'Jak najszybciej' && styles.selectedText}>{selectedOption || t('chooseHour')}</Text>
                </View>
            </TouchableOpacity>

            {showTimePicker && (
                <ScrollView style={styles.timePickerContainer}>
                    {timeSlots.map((time, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setSelectedOption(time);
                                setShowTimePicker(false);
                            }}
                        >
                            <View
                                style={[
                                    styles.timeSlot,
                                    selectedOption === time && styles.selectedTimeSlot,
                                ]}
                            >
                                <Text>{time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

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
    deliveryButton: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 15,
        margin: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        flexDirection: 'row',
    },
    selectedOption: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    timePickerContainer: {
        maxHeight: 200,
        width: '100%',
        marginTop: 10,
    },
    timeSlot: {
        padding: 15,
        margin: 5,
        borderRadius: 10,
        backgroundColor: Colors.lightGrey,
        alignItems: 'center',
    },
    selectedTimeSlot: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    selectedText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default SelectHour;
