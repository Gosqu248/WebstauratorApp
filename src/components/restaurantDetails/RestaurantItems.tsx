import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import config from "@/src/config";
import { Menu } from "@/src/interface/menu";
import { useRoute } from "@react-navigation/native";

const RestaurantItems = ({selectedCategory, searchQuery}) => {
    const [menu, setMenu] = useState<(Menu | { isHeader: true; title: string })[]>([]);
    const route = useRoute();
    const { restaurantId } = route.params;

    const filteredMenu = selectedCategory
        ? menu.filter(item => ('isHeader' in item && item.title === selectedCategory) || item.category === selectedCategory)
        : searchQuery.length > 0
            ? menu.filter(item => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : menu;
    const fetchMenu = async () => {
        try {
            const response = await axios.get<Menu[]>(`${config.backendUrl}/menu/getRestaurantMenu?restaurantId=${restaurantId}`);
            if (response?.data) {
                const flattenedMenu = response.data.reduce((acc, item) => {
                    const categoryHeaderIndex = acc.findIndex(el => el.isHeader && el.title === item.category);
                    if (categoryHeaderIndex === -1) {
                        acc.push({ isHeader: true, title: item.category });
                    }
                    acc.push(item);
                    return acc;
                }, [] as (Menu | { isHeader: true; title: string })[]);
                setMenu(flattenedMenu);
            } else {
                console.error('No menu data received');
            }
        } catch (error) {
            console.error('Error fetching menu', error);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.menuList}>
            {filteredMenu.map((item, index) => {
                if ('isHeader' in item) {
                    return <Text key={`header-${item.title}`} style={styles.categoryTitle}>{item.title}</Text>;
                }

                return (
                    <View key={`${item.id}-${index}`} style={styles.menuItem}>
                        <View style={styles.menuDetails}>
                            <Text style={styles.menuName}>{item.name}</Text>
                            <Text style={styles.menuIngredients}>{item.ingredients}</Text>
                            <Text style={styles.menuPrice}>{item.price.toFixed(2)} zł</Text>
                        </View>
                        {item.image && (
                            <Image source={{ uri: item.image }} style={styles.menuImage} />
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    menuList: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#f0f0f0',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
        padding: 10,
    },
    menuImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    menuDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    menuName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuIngredients: {
        fontSize: 14,
        color: '#555',
        marginVertical: 4,
    },
    menuPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default RestaurantItems;
