import React, {useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '@/src/interface/restaurant';
import DeliveryHours from '@/src/components/restaurantDetails/DeliveryHours';
import Colors from "@/constants/Colors";
import api from "@/src/api";

const Info = ({ restaurant }: { restaurant: Restaurant }) => {
  const mapRef = useRef(null);
  const { t } = useTranslation();
  const imgUrl = api.backendImgUrl;

  const location = {
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    latitudeDelta: 0.0053,
    longitudeDelta: 0.0053,
  };


  return (
    <ScrollView style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={location} mapType="none">
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={20} color="#000" />
        <Text style={styles.headerText}> {t('deliveryHour')}</Text>
      </View>
      <DeliveryHours deliveryHours={restaurant.deliveryHour} />

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
                {restaurant.paymentMethods?.map((payment) => (
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
        <View style={styles.description2}>
            <Text style={styles.infoText}> {restaurant.name}</Text>
            <Text style={styles.infoText}> {restaurant.address?.street} {restaurant.address?.flatNumber}</Text>
            <Text style={styles.infoText}> {restaurant.address?.zipCode} {restaurant.address?.city}</Text>
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
    width: '90%',
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
    description2: {
        width: '90%',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
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
