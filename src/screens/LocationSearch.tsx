import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import PlaceAutocomplete from '@/src/components/searchLocation/PlaceAutocomplete';
import Colors from '@/constants/Colors';
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocationSearch = () => {
    const [address, setAddress] = useState('');
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const { t } = useTranslation();

    const [location, setLocation] = useState({
        latitude: 50.012100,
        longitude: 20.985842,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    });

    const handleLocationChange = (selectedLocation, address) => {
        const newRegion = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };
        setLocation(newRegion);
        if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion, 1000);
        }
    };

    const handleAddress = (address) => {
        setAddress(address)
    }

    const confirmLocation = async () => {
        if (address) {
            try {
                await AsyncStorage.setItem('selectedAddress', address);
                console.log('Address saved:', address);
            } catch (error) {
                console.error('Error saving address:', error);
            }
        }
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1 }}>
            <PlaceAutocomplete onLocationSelected={handleLocationChange} address={handleAddress}/>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={location}
                mapType="none"
            >
                <UrlTile
                    urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={100}
                />
            </MapView>
            <View style={styles.absoluteBox}>
                <TouchableOpacity style={styles.button} onPress={confirmLocation}>
                    <Text style={styles.buttonText}>{t('confirm')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    absoluteBox: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LocationSearch;
