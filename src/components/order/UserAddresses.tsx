import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchAvailableAddresses} from "@/src/services/userAddress";
import {UserAddress} from "@/src/interface/userAddress";
import useAuthStore from "@/src/zustand/auth";
import {useCoordinatesStore} from "@/src/zustand/coordinates";
import {useTranslation} from "react-i18next";
import Colors from "@/constants/Colors";
import {useDeliveryAddressStore} from "@/src/zustand/deliveryAddress";
import {Ionicons} from "@expo/vector-icons";

const UserAddresses = () => {
    const {t} = useTranslation();
    const [availableAddresses, setAvailableAddresses] = useState<UserAddress[]>([]);
    const jwt = useAuthStore(state => state.jwt)
    const coordinates = useCoordinatesStore(state => state.coordinates)
    const isAuth = useAuthStore(state => state.isAuthenticated)
    const setDeliveryAddress = useDeliveryAddressStore(state => state.setDeliveryAddress);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

    const handleSelectAddress = (address: UserAddress) => {
        setDeliveryAddress(address);
        setSelectedAddressId(address.id)
    }

    useEffect(() => {
        if (isAuth) {
            fetchAvailableAddresses(jwt, coordinates).then(addresses => {
                setAvailableAddresses(addresses || []);
            });
        }
    }, [isAuth]);

    return (
        isAuth && (
            <>
                <Text style={styles.mainText}>{t('deliveryAddress')}</Text>
                {availableAddresses.length > 0 ? (
                    <View>
                        {availableAddresses.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => handleSelectAddress(item)}>
                                <View style={[
                                    styles.addressContainer,
                                    item.id === selectedAddressId && styles.selectedAddressContainer
                                ]}>
                                    <Text style={styles.addressText}>
                                        {item.street} {item.houseNumber}, {item.city}
                                    </Text>
                                    {item.id === selectedAddressId && (
                                        <Ionicons name="checkmark-circle" size={24} color={Colors.iconOrange} style={styles.icon} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <Text>{t('noAddressesAvailable')}</Text>
                )}
                <TouchableOpacity style={styles.loginButton} >
                    <Text style={styles.loginButtonText}>{t('addAddress')}</Text>
                </TouchableOpacity>
            </>
        )
    );
};

const styles = StyleSheet.create({
    addressContainer: {
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
    selectedAddressContainer: {
        borderColor: Colors.iconOrange,
        borderWidth: 2,
    },
    addressText: {
        fontSize: 20,
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    loginButton: {
        margin: 10,
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        marginLeft: 10,
    },
});

export default UserAddresses;
