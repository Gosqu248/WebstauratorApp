import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import axios from "axios";
import config from "@/src/config";
import {useRoute} from "@react-navigation/native";
import Colors from "@/constants/Colors";

const CategoryScrollView = () => {
    const [categories, setCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const route = useRoute();
    const { restaurantId } = route.params;

    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);

    const fetchCategories = async () => {
        const response = await axios.get(`${config.backendUrl}/menu/menuCategories?restaurantId=${restaurantId}`);
        if (response) {
            setCategories(response.data);
        } else {
            console.error('Error fetching categories');
        }
    }


    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        selected.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={styles.segmentsShadow}>
            <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentScrollview}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        ref={(ref) => (itemsRef.current[index] = ref!)}
                        key={index}
                        style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}
                        onPress={() => selectCategory(index)}>
                        <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{item.category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    segmentsShadow: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentText: {
        color: Colors.primary,
        fontSize: 16,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentScrollview: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20,
        paddingBottom: 4,
    },
});
export default CategoryScrollView;
