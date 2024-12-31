import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { OrderMenu } from '@/src/interface/orderMenu';
import Colors from '@/constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import basket from "@/src/screens/Basket";
import {useCartStore} from "@/src/zustand/cartStore";

const OrderMenuItem = ({ orderMenu, restaurantId }: { orderMenu: OrderMenu, restaurantId: number }) => {
    const increaseQuantity = useCartStore(state => state.increaseQuantity);
    const decreaseQuantity = useCartStore(state => state.decreaseQuantity);


    const menuPrice = orderMenu.chooseAdditives
        ? (orderMenu.chooseAdditives.reduce((total, additive) => total + additive.price, 0) + orderMenu.menu.price * orderMenu.quantity).toFixed(2)
        : (orderMenu.menu.price * orderMenu.quantity).toFixed(2);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.name}>{orderMenu.menu.name}</Text>
                {orderMenu.menu.ingredients && (
                    <Text>{orderMenu.menu.ingredients}</Text>
                )}
                <View>
                    {orderMenu.chooseAdditives &&
                        orderMenu.chooseAdditives.map((additive) => (
                            <View style={styles.additiveContainer} key={additive.id}>
                                <Text style={{color: '#5e5d5d'}}>{additive.value}</Text>
                            </View>
                        ))}

                </View>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.menuPrice}>
                    {menuPrice} zł
                </Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 3 }} onPress={() => decreaseQuantity(restaurantId, orderMenu.menu.id)}>
                        <Ionicons name={'remove'} size={25} color={'#8a8a8a'} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{orderMenu.quantity}</Text>
                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => increaseQuantity(restaurantId, orderMenu.menu.id)}>
                        <Ionicons name={'add'} size={25} color={'#8a8a8a'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        minHeight: 120,
        paddingTop: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#d7d5d5',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    quantityContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#dad8d8',
        borderRadius: 5,
    },
    additiveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuPrice: {
        fontSize: 17,
        color: 'black',
    },
    button: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'black',
    }
});

export default OrderMenuItem;
