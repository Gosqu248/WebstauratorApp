import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import {OrderDTO} from "@/src/interface/order";
import {getUserOrders} from "@/src/services/orderService";
import {useTranslation} from "react-i18next";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const OrdersHistoryScreen = () => {
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getUserOrders();
                setOrders(ordersData);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerTitle: t('orders'),
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center', // Center the header title
            headerLeft: () => (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                        <Ionicons name="arrow-back" size={27} color={'white'} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const renderOrderItem = ({ item }: { item: OrderDTO }) => (
        <View style={styles.orderItem}>
            <View style={styles.restaurantInfo}>
                <Image source={{ uri: item.restaurantLogo }} style={styles.restaurantLogo} />
                <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            </View>
            <Text style={styles.orderDate}>{t('orderNumber')} {item.id}</Text>
            <Text style={styles.orderDate}>{t('orderDate')}: {new Date(item.orderDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}</Text>
            <Text style={styles.deliveryOption}>{t('deliveryMethod')}: {item.deliveryOption}</Text>
            <Text style={styles.deliveryTime}>{t('deliveryTime')}: {item.deliveryTime}</Text>
            <Text style={styles.paymentMethod}>{t('payment')}: {item.paymentMethod}</Text>
            <Text style={styles.userAddress}>
                {t('toAddress')}: {item.userAddress.street} {item.userAddress.houseNumber}, {item.userAddress.city}
            </Text>
            <Text style={styles.totalPrice}>{t('price')}: {item.totalPrice.toFixed(2)} zł</Text>
            <Text style={styles.orderMenusTitle}>{t('ordersMenu')}:</Text>
            {item.orderMenus.map((menu) => (
                <View key={menu.menu.id} style={styles.menuItem}>
                    <Image source={{ uri: menu.menu.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    <Text style={styles.menuName}>{menu.menu.name}</Text>
                    <View style={styles.menuContainer}>
                        <Text style={styles.menuQuantity}>{t('quantity')}: {menu.quantity}</Text>
                        <Text style={styles.menuPrice}>{t('price')}: {menu.menu.price.toFixed(2)} zł</Text>
                    </View>
                </View>
            ))}
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOrderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    orderItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    restaurantInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    restaurantLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    deliveryOption: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    deliveryTime: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    totalPrice: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    status: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    paymentMethod: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    userAddress: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    hasOpinion: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    orderMenusTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 5,
    },
    menuName: {
        fontSize: 14,
        maxWidth: 220,
        fontWeight: '500',
    },
    menuContainer: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    menuQuantity: {
        fontSize: 14,
        color: '#777',
    },
    menuPrice: {
        fontSize: 14,
        color: '#777',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

export default OrdersHistoryScreen;
