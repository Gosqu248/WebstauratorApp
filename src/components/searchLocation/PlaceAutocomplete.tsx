import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import { fetchSuggestions, fetchCoordinates } from "@/src/services/locationService";

const PlaceAutocomplete = ({ onLocationSelected, address }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { t } = useTranslation();

    const handleInputChange = (text) => {
        setQuery(text);
        if (text.length >= 1) {
            fetchSuggestions(text).then(setSuggestions)
        } else {
            setSuggestions([]);
        }
    };

    const searchLocation = async () => {
        const coordinates = await fetchCoordinates(query).then(address(query));

        if (coordinates && onLocationSelected) {
            onLocationSelected(coordinates);
        }
    }

    const handleSelectSuggestion = async (suggestion ) => {
        setQuery(suggestion);
        setSuggestions([]);
        const coordinates = await fetchCoordinates(suggestion).then(address(suggestion));
        if (coordinates && onLocationSelected) {
            onLocationSelected(coordinates);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={query}
                    onChangeText={handleInputChange}
                    placeholder={t('search')}
                />
                <TouchableOpacity onPress={searchLocation}>
                    <Ionicons name="search" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {suggestions.length > 0 && (
                <View style={styles.suggestionContainer}>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={({ item }) => (

                                <TouchableOpacity
                                    style={styles.suggestion}
                                    onPress={() => handleSelectSuggestion(item.name)}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                        )}
                    />
                </View>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        zIndex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#333',
    },
    icon: {
        fontSize: 24,
        color: '#888',
        marginLeft: 10,
    },
    suggestionContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        padding: 5,
    },
    suggestion: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default PlaceAutocomplete;
