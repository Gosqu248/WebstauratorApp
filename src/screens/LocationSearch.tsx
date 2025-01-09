import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import PlaceAutocomplete from '@/src/components/searchLocation/PlaceAutocomplete';
import Colors from '@/constants/Colors';
import { useTranslation } from "react-i18next";
import { useAddressStore } from "@/src/zustand/address";
import { useCoordinatesStore } from "@/src/zustand/coordinates";

const LocationSearch = () => {
    const setAddress = useAddressStore((state) => state.setAddress);
    const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const { t } = useTranslation();
    const [prvAddress, setPrvAddress] = useState('');

    const [location, setLocation] = useState({
        latitude: 50.012100,
        longitude: 20.985842,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    });

    const handleLocationChange = (selectedLocation) => {
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
        setPrvAddress(address)
    }

    const confirmLocation = async () => {
        setCoordinates(location);
        setAddress(prvAddress);
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1 }}>
            <PlaceAutocomplete onLocationSelected={handleLocationChange} address={handleAddress} />
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
                <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
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
