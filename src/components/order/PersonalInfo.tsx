import {StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useEffect} from 'react'
import useAuthStore from "@/src/zustand/auth";
import Colors from "@/constants/Colors";
import {useTranslation} from "react-i18next";
import {useOrderStore} from "@/src/zustand/order";
import {UserDTO} from "@/src/interface/user";

const PersonalInfo = () => {
    const { t } = useTranslation();
    const user: UserDTO = useAuthStore(state => state.user);
    const deliveryAddress = useOrderStore(state => state.deliveryAddress);
    const setName = useOrderStore(state => state.setName);
    const setEmail = useOrderStore(state => state.setEmail);
    const setPhone = useOrderStore(state => state.setPhone);

    useEffect(() => {
        if (user?.name) setName(user.name);
        if (user?.email) setEmail(user.email);
        if (deliveryAddress?.phoneNumber) setPhone(deliveryAddress.phoneNumber);
    }, [user, deliveryAddress, setName, setEmail, setPhone]);

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>{t('personalData')}</Text>

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setName(text)}
                defaultValue={user?.name}
                placeholder={t('name')}
            />

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
                defaultValue={user?.email}
                placeholder={t('email')}
            />

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setPhone(text)}
                defaultValue={deliveryAddress?.phoneNumber}
                placeholder={t('phoneNumber')}
            />
        </View>

    )
}

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
    textInput: {
        width: '100%',
        height: 'auto',
        margin: 10,
        minHeight: 50,
        borderColor: '#e5e5e5',
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
})
export default PersonalInfo
