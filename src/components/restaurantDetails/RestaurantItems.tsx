import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Menu } from "@/src/interface/menu";
import { useRoute } from "@react-navigation/native";
import {fetchMenu} from "@/src/services/menuService";
import AddToBasket from "@/src/components/restaurantDetails/AddToBasket";

const RestaurantItems = ({selectedCategory, searchQuery}) => {
    const [menu, setMenu] = useState<(Menu | { isHeader: true; title: string })[]>([]);
    const route = useRoute();
    const { restaurantId } = route.params;
    const [isAddModal, setAddModal] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<Menu | null>(null);

    const filteredMenu = selectedCategory
        ? menu.filter(item => ('isHeader' in item && item.title === selectedCategory) || item.category === selectedCategory)
        : searchQuery.length > 0
            ? menu.filter(item => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : menu;

    const toggleAddModal = (item?: Menu) => {
        setSelectedMenuItem(item || null);
        setAddModal(!isAddModal);
    };

    useEffect(() => {
        const fetchData = async () => {
            const menuData = await fetchMenu(restaurantId);
            setMenu(menuData);
        };
        fetchData();
    }, [restaurantId]);

    return (
        <ScrollView contentContainerStyle={styles.menuList}>
            {filteredMenu.map((item, index) => {
                if ('isHeader' in item) {
                    return <Text key={`header-${item.title}`} style={styles.categoryTitle}>{item.title}</Text>;
                }

                return (
                    <TouchableOpacity key={`${item.id}-${index}`} style={styles.menuItem} onPress={() => toggleAddModal(item as Menu)}>
                        <View style={styles.menuDetails}>
                            <Text style={styles.menuName}>{item.name}</Text>
                            <Text style={styles.menuIngredients}>{item.ingredients}</Text>
                            <Text style={styles.menuPrice}>{item.price.toFixed(2)} zł</Text>
                        </View>
                        {item.image && (
                            <Image source={{ uri: item.image }} style={styles.menuImage} />
                        )}
                    </TouchableOpacity>
                );
            })}
            {selectedMenuItem && (
                <AddToBasket menu={selectedMenuItem} visible={isAddModal} onClose={toggleAddModal}/>
            )}
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
