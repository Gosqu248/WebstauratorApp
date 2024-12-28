import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from "axios";
import config from "@/src/config";
import { useRoute } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import RestaurantItems from "@/src/components/restaurantDetails/RestaurantItems";
import {useTranslation} from "react-i18next";
import {fetchCategories} from "@/src/services/categoryService";

const CategoryScrollView = () => {
    const [categories, setCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const route = useRoute();
    const { restaurantId } = route.params;
    const { t } = useTranslation();

    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);



    const selectCategory = (index: number) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            setSelectedCategory(null);
        } else {
            setActiveIndex(index);
            setSelectedCategory(categories[index]);
            itemsRef.current[index]?.measure((x, y, width, height, pageX) => {
                scrollRef.current?.scrollTo({ x: pageX - 16, y: 0, animated: true });
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = await fetchCategories(restaurantId);
            setCategories(categoriesData);
        };
        fetchData();
    }, [restaurantId]);

    const clearSearch = () => {
        setSearchQuery('');
        setIsSearchVisible(false);
    };

    return (
        <View style={{paddingVertical: 10}}>
            <View style={styles.segmentsShadow}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.segmentScrollview}>
                    {isSearchVisible ? (
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder={t('search')}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onBlur={() => setIsSearchVisible(false)}
                            />
                            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                                <Ionicons name="close-circle" size={26} color={Colors.iconOrange} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.roundButton} onPress={() => setIsSearchVisible(true)}>
                            <Ionicons name="search-outline" size={27} color={Colors.iconOrange} />
                        </TouchableOpacity>
                    )}
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            ref={(ref) => (itemsRef.current[index] = ref!)}
                            key={index}
                            style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}
                            onPress={() => selectCategory(index)}>
                            <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <RestaurantItems selectedCategory={selectedCategory} searchQuery={searchQuery} />
        </View>
    );
};

const styles = StyleSheet.create({
    segmentsShadow: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        width: '100%',
        height: 50,

    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Colors.lightGrey,
    },
    segmentText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    segmentScrollview: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        width: 300,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
    },
    clearButton: {
        padding: 10,
        marginLeft: -50,
    },
});

export default CategoryScrollView;
