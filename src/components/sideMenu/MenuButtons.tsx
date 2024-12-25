import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from "@/constants/Colors";
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MenuButtons = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'pl' ? 'en' : 'pl';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="cart" style={styles.icon} />
                <Text style={styles.menuText}>{t('orders')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="favorite" style={styles.icon} />
                <Text style={styles.menuText}>{t('favourites')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={toggleLanguage}>
                <FontAwesome6 name="language" style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.menuText}>{t('language')}</Text>
                    {
                        i18n.language === 'pl' ? (
                                <>
                                    <Image style={styles.flag} source={require('../../../assets/images/poland-logo.png')} />
                                    <Text>/</Text>
                                    <Image style={styles.flag} source={require('../../../assets/images/uk-logo.png')} />
                                </>
                            )
                            : (
                                <>
                                    <Image style={styles.flag} source={require('../../../assets/images/uk-logo.png')} />
                                    <Text>/</Text>
                                    <Image style={styles.flag} source={require('../../../assets/images/poland-logo.png')} />
                                </>
                            )
                    }

                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    menuItem: {
        width: '93%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: 4,
        borderRadius: 10,
        alignContent: 'center',
    },
    icon: {
        fontSize: 24,
        marginRight: 10,
        color: Colors.dark,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    menuText: {
        fontSize: 16,
    },
    flag: {
        width: 24,
        height: 24,

    },
});
export default MenuButtons;
