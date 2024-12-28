import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DeliveryHour } from '@/src/interface/delivery';
import Colors from "@/constants/Colors";

const DeliveryHours = ({ deliveryHours }: { deliveryHours: DeliveryHour[] }) => {
  const { t } = useTranslation();

  const getDayName = (dayOfWeek: number): string => {
    const days = [
      t('sunday'),
      t('monday'),
      t('tuesday'),
      t('wednesday'),
      t('thursday'),
      t('friday'),
      t('saturday')
    ];
    return days[dayOfWeek];
  };

  return (
    <View style={styles.hourView}>
      {deliveryHours.map((hour) => (
        <View key={hour.id} style={styles.hourContainer}>
          <Text>{getDayName(hour.dayOfWeek)}:</Text>
          <Text>
            {hour.openTime} - {hour.closeTime}
            {hour.openTime === 'null' || hour.openTime === '0' ? (
              <Text> {t('closed')}</Text>
            ) : null}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  hourView: {
    width: '90%',
    backgroundColor: Colors.lightGrey,
      borderRadius: 10,
      alignSelf: 'center',

  },
  hourContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default DeliveryHours;
