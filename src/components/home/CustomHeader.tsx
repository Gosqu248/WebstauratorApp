import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetCustom from "@/src/components/home/BottomSheetCustom";
import AsyncStorage from '@react-native-async-storage/async-storage';

type CustomHeaderProps = {
    openDrawer: () => void;
};

const CustomHeader = ({ openDrawer }: CustomHeaderProps) => {
    const [address, setAddress] = useState<string | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
        bottomSheetModalRef.current?.present();
    }

    useEffect(() => {
        const checkSelectedAddress = async () => {
            try {
                const savedAddress = await AsyncStorage.getItem('selectedAddress');
                if (savedAddress && savedAddress !== address) {
                    setAddress(savedAddress);
                } else {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        setErrorMsg('Permission to access location was denied');
                        return;
                    }

                    let location = await Location.getCurrentPositionAsync({});
                    setLocation(location);
                    if (location) {
                        let address = await Location.reverseGeocodeAsync(location.coords);
                        setAddress(address[0]?.street + ' ' + address[0]?.streetNumber + ', ' + address[0]?.city);
                    }
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        checkSelectedAddress();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <BottomSheetCustom ref={bottomSheetModalRef} />
            <View style={styles.container}>
                <View style={styles.main}>
                    <TouchableOpacity onPress={() => {}}>
                        <Image style={styles.image} source={require('../../../assets/images/webstaurator-logo.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
                        <View style={styles.nameView}>
                            <Text style={styles.subtitle}>{address ? address : 'Loading'}</Text>
                            <Ionicons name={'chevron-down-outline'} size={24} color={'black'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openDrawer}>
                        <Ionicons name={'menu'} size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        height: 80,
        backgroundColor: 'white',
        flexDirection: "row",
        gap: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 35,
        height: 45,
    },
    titleContainer: {
        flex: 1,
        paddingLeft: 15,
    },
    nameView: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        color: "#b6b4a5",
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: "#e59132",
        fontWeight: 'bold',
        padding: 5,
    },
});

export default CustomHeader;
