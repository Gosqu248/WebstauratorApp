import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import useAuthStore from "@/src/zustand/auth";

const Login = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [faCode, setFaCode] = useState('');
    const [error, setError] = useState('');
    const [fa, set2fa] = useState(false);
    const login = useAuthStore().login;
    const verify2FA = useAuthStore().verify2FA;

    const handleLogin = async () => {
        try {
            const success = await login(email, password);
            if (success) {
                set2fa(true);
                console.log('Sending 2fa code');
            } else {
                setError('Invalid email or password');
                console.log('Invalid email or password');
            }
        } catch (error) {
            setError('Something went wrong');
            console.error('Something went wrong:', error.response?.data || error.message);
        }
    };

    const handle2fa = async () => {
        try {
            const jwt = await verify2FA(faCode);
            if (jwt) {
                console.log('Logged in');
                navigation.goBack();
            } else {
                setError('Invalid 2FA code');
                console.log('Invalid 2FA code');
            }
        } catch (error) {
            setError('Something went wrong');
            console.error('Something went wrong:', error.response?.data || error.message);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerTitle: t('login'),
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
            <TouchableOpacity style={styles.googleButton}>
                <Image style={styles.image} source={require('@/assets/images/googleImg.png')} />
                <Text style={styles.googleButtonText}>{t('loginWithGoogle')}</Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <Text style={styles.separatorText}>{t('or')}</Text>
                <View style={styles.separator} />
            </View>
            { !fa ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={t('email')}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={Colors.iconOrange}
                    />

                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={t('password')}
                        secureTextEntry
                        autoCapitalize="none"
                        placeholderTextColor={Colors.iconOrange}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>{t('sendCode')}</Text>
                    </TouchableOpacity>

                </>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        value={faCode}
                        onChangeText={setFaCode}
                        placeholder={t('twoFactorCode')}
                        autoCapitalize="none"
                        placeholderTextColor={Colors.iconOrange}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handle2fa}>
                        <Text style={styles.loginButtonText}>{t('login')}</Text>
                    </TouchableOpacity>

                </>
            )
            }


            <View style={{flexDirection: 'row', padding: 20}}>
                <Text style={{fontSize: 18, color: '#797777'}}>{t('dontHaveAccount')}</Text>
                <Text style={styles.createAccountText}  onPress={() => navigation.navigate('Register')}> {t('createNow')} </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    input: {
        width: '100%',
        padding: 20,
        borderRadius: 8,
        borderColor: Colors.iconOrange,
        borderWidth: 1,
        marginBottom: 20,
        fontSize: 16,
        color: '#000000',
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
    resetButton: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: Colors.iconOrange,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    resetButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    createAccountText: {
        color: Colors.iconOrange,
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 35,
        height: 45,
    },
});

export default Login;
