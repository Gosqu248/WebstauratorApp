import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Register = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerTitle: t('createAccount'),
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

    const handleRegister = () => {
        setFormSubmitted(true);
        // Add your validation logic here
        // Example:
        // if (!email) {
        //     setEmailError(t('emailError'));
        // }
        // if (!password) {
        //     setPasswordError(t('passwordError'));
        // }
        // if (password !== confirmPassword) {
        //     setConfirmPasswordError(t('confirmPasswordError'));
        // }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.googleButton}>
                    <Image style={styles.image} source={require('@/assets/images/googleImg.png')} />
                    <Text style={styles.googleButtonText}>{t('loginWithGoogle')}</Text>
                </TouchableOpacity>

                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                    <Text style={styles.separatorText}>{t('or')}</Text>
                    <View style={styles.separator} />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder={t('name')}
                    autoCapitalize="none"
                    placeholderTextColor={Colors.iconOrange}
                />

                <TextInput
                    style={styles.input}
                    placeholder={t('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.iconOrange}
                />
                {formSubmitted && emailError ? (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle" size={20} color="red" />
                        <Text style={styles.errorText}>{emailError}</Text>
                    </View>
                ) : null}

                <TextInput
                    style={styles.input}
                    placeholder={t('password')}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor={Colors.iconOrange}
                />
                {formSubmitted && passwordError ? (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle" size={20} color="red" />
                        <Text style={styles.errorText}>{passwordError}</Text>
                    </View>
                ) : null}

                <TextInput
                    style={styles.input}
                    placeholder={t('confirmPassword')}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor={Colors.iconOrange}
                />
                {formSubmitted && confirmPasswordError ? (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle" size={20} color="red" />
                        <Text style={styles.errorText}>{confirmPasswordError}</Text>
                    </View>
                ) : null}

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>{t('createAccount')}</Text>
                </TouchableOpacity>

                <Text style={styles.termsText}>{t('registerAccept')}</Text>

                <View style={styles.lastContainer}>
                    <Text style={styles.haveAccountText}>{t('haveAccount')} </Text>
                    <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>{t('login')}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        paddingTop: 40,
        backgroundColor: '#ffffff',
    },
    header: {
        width: 100,
        height: 50,
        flexDirection: 'row',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        borderColor: Colors.iconOrange,
        borderWidth: 1,
        marginBottom: 20,
        fontSize: 16,
        color: '#000000',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
    },
    registerButton: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    termsText: {
        color: '#797777',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#aba9a9',
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#807f7f',
    },
    googleButton: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#aba9a9',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    googleButtonText: {
        color: '#807f7f',
        fontSize: 16,
        paddingLeft: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 35,
        height: 45,
    },
    lastContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    haveAccountText: {
        fontSize: 18,
        color: '#797777',
    },
    loginText: {
        color: Colors.iconOrange,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Register;
