import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import useAuthStore from "@/src/zustand/auth";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import Colors from "@/constants/Colors";
import {useDeliveryStore} from "@/src/zustand/delivery";
import {Ionicons} from "@expo/vector-icons";
import UserAddresses from "@/src/components/order/UserAddresses";

const DeliveryAddress = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const isAuth = useAuthStore(state => state.isAuthenticated)
    const deliveryType = useDeliveryStore(state => state.deliveryType)

    return (
        <View style={styles.container}>
                <View style={styles.loginContainer}>
                    {!isAuth ? (
                        <>
                            <Text style={styles.loginText}>{t('mustLogin')}</Text>
                            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginButtonText}>{t('login')}</Text>
                            </TouchableOpacity>
                        </>
                        ) : deliveryType === 'pickup' ? (
                            <View style={{flexDirection: 'row'}}>
                                <Ionicons name="shield-checkmark" size={24} color={Colors.primary} />
                                <Text>{t('youAreLogin')}</Text>
                            </View>
                        ) : (
                            <UserAddresses/>
                        )
                    }
                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    loginButton: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        fontSize: 18,
        color: '#797777',
        marginBottom: 20,
    }
});

export default DeliveryAddress
