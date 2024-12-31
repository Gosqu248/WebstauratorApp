import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import MenuButtons from "@/src/components/sideMenu/MenuButtons";
import {useNavigation} from "@react-navigation/native";

const SideMenu = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.bottomContent}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="happy-outline" style={styles.icon} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.greetingText}>Cześć!</Text>
                        <Text style={styles.contactText}>Moje dane kontaktowe</Text>
                    </View>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>{t('login')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: Colors.red }]} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.buttonText}>{t('createAccount')}</Text>
                    </TouchableOpacity>
                </View>
                <MenuButtons />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: '20%',
        backgroundColor: Colors.iconOrange,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    bottomContent: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    iconContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        marginRight: 20,
    },
    icon: {
        fontSize: 50,
        color: Colors.iconOrange,
    },
    textContainer: {
        flexDirection: 'column',
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 5,
    },
    contactText: {
        fontSize: 15,
        color: '#fff',
    },
    mainContainer: {
        paddingVertical: 20,
        height: '80%',
        backgroundColor: '#f6f5f5',
        padding: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        backgroundColor: Colors.iconOrange,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuText: {
        fontSize: 16,
        color: Colors.iconOrange,
    },
});

export default SideMenu;
