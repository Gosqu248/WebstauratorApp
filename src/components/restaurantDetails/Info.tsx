import React, { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '@/src/interface/restaurant';
import { fetchRestaurantAddress } from '@/src/services/restaurantService';
import { RestaurantAddress } from '@/src/interface/restaurantAddress';
import { DeliveryHour } from '@/src/interface/delivery';
import DeliveryHours from '@/src/components/restaurantDetails/DeliveryHours';
import { fetchDeliveryHour } from "@/src/services/deliveryHourService";
import Colors from "@/constants/Colors";
import { fetchRestaurantPaymentMethods } from "@/src/services/paymentService";
import { PaymentMethod } from "@/src/interface/paymentMethod";
import config from "@/src/config";

const Info = ({ restaurant }: { restaurant: Restaurant }) => {
  const mapRef = useRef(null);
  const { t } = useTranslation();
  const [address, setAddress] = useState<RestaurantAddress>();
  const [deliveryHour, setDeliveryHour] = useState<DeliveryHour[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const imgUrl = config.backendImgUrl;

  const location = {
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    latitudeDelta: 0.0053,
    longitudeDelta: 0.0053,
  };

  const getAddress = async () => {
    const fetchedAddress = await fetchRestaurantAddress(restaurant.restaurantId);
    setAddress(fetchedAddress);
  };

  const getDeliveryHour = async () => {
    const fetchedDeliveryHour = await fetchDeliveryHour(restaurant.restaurantId);
    setDeliveryHour(fetchedDeliveryHour);
  };

  const getPaymentMethods = async () => {
    const fetchedPaymentMethods = await fetchRestaurantPaymentMethods(restaurant.restaurantId);
    setPaymentMethods(fetchedPaymentMethods);
    console.log(fetchedPaymentMethods);
  };

  useEffect(() => {
    getAddress();
    getDeliveryHour();
    getPaymentMethods();
  }, [restaurant.restaurantId]);

  return (
    <ScrollView style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={location} mapType="none">
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={20} color="#000" />
        <Text style={styles.headerText}> {t('deliveryHour')}</Text>
      </View>
      <DeliveryHours deliveryHours={deliveryHour} />

      <View style={styles.header}>
        <Ionicons name="cash-outline" size={20} color="#000" />
        <Text style={styles.headerText}> {t('fees')}</Text>
      </View>
      <View style={styles.description}>
        <View style={styles.descriptionContainer}>
          <Text>{t('deliveryFee')}: </Text>
          <Text>{restaurant.delivery?.deliveryPrice?.toFixed(2 )} zł</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>{t('feesComment')}: </Text>
            <Text>{restaurant.delivery?.minimumPrice?.toFixed(2)} zł</Text>
        </View>
      </View>

      <View style={styles.header}>
        <Ionicons name="card-outline" size={20} color="#000" />
        <Text style={styles.headerText}> {t('paymentMethods')}</Text>
      </View>
        <View style={styles.description}>
            <View style={styles.paymentMethods}>
                {paymentMethods.map((payment) => (
                    <View key={payment.method} style={styles.paymentItem}>
                        <Image source={{ uri: imgUrl + payment.image }} style={styles.paymentImage} />
                    </View>
                ))}
            </View>
        </View>

      <View style={styles.header}>
        <Ionicons name="information-circle-outline" size={20} color="#000" />
        <Text style={styles.headerText}> {t('info')}</Text>
      </View>
        <View style={styles.description}>
            <Text style={styles.infoText}> {restaurant.name}</Text>
            <Text style={styles.infoText}> {address?.street} {address?.flatNumber}</Text>
            <Text style={styles.infoText}> {address?.zipCode} {address?.city}</Text>

        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
  map: {
    height: 200,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
      alignSelf: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
    paymentMethods: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
    },
    paymentItem: {
        margin: 10,
    },
    paymentImage: {
        width: 60,
        height: 50,
    },
    infoText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    }

});

export default Info;
