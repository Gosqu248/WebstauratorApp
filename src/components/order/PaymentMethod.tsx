import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { PaymentMethod} from '@/src/interface/paymentMethod';
import api from "@/src/api";
import Colors from "@/constants/Colors";
import {useTranslation} from "react-i18next";
import {useOrderStore} from "@/src/zustand/order";

const PaymentMethodComponent = ({ paymentMethods }: { paymentMethods: PaymentMethod[] }) => {
    const { t } = useTranslation();
    const selectedPayment = useOrderStore(state => state.selectedPayment);
    const setSelectedPayment = useOrderStore(state => state.setSelectedPayment);

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>{t('payment')}</Text>
            {
                paymentMethods.map((payment) => (
                    <TouchableOpacity key={payment.method}
                        onPress={() => {
                            if (selectedPayment === payment.method) {
                                setSelectedPayment(null);
                            } else {
                                setSelectedPayment(payment.method);
                            }}}>
                        <View style={[styles.paymentContainer, selectedPayment === payment.method && styles.selectedPaymentContainer]}>
                            <Image source={{ uri: api.backendImgUrl + payment.image }} style={styles.image} />
                            <Text style={styles.text}>{payment.method}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
    paymentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    image: {
        width: 70,
        height: 50,
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
    selectedPaymentContainer: {
        borderColor: Colors.iconOrange,
        borderWidth: 2,
    }
});

export default PaymentMethodComponent;
