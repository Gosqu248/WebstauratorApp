import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useDeliveryStore } from "@/src/zustand/delivery";

export type Ref = BottomSheetModal;

const BottomSheetCustom = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['25', '50%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { deliveryType, setDeliveryType } = useDeliveryStore();

    const goToLocationSearch = () => {
        navigation.navigate('LocationSearch'); // Navigate to the LocationSearch screen
    };

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.toggle}>
                    <TouchableOpacity
                        style={deliveryType === 'delivery' ? styles.toggleActive : styles.toggleInactive}
                        onPress={() => setDeliveryType('delivery')}
                    >
                        <Text style={deliveryType === 'delivery' ? styles.activeText : styles.inactiveText}>{t('delivery')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={deliveryType === 'pickup' ? styles.toggleActive : styles.toggleInactive}
                        onPress={() => setDeliveryType('pickup')}
                    >
                        <Text style={deliveryType === 'pickup' ? styles.activeText : styles.inactiveText}>{t('pickup')}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subheader}>{t('yourLocation')}</Text>
                <TouchableOpacity onPress={goToLocationSearch}>
                    <View style={styles.item}>
                        <Ionicons name="location-outline" size={20} color={Colors.medium} />
                        <Text style={{ flex: 1 }}>{t('currentLocation')}</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                    </View>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 32,
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 32,
        paddingHorizontal: 30,
    },
    activeText: {
        color: '#fff',
        fontWeight: '700',
    },
    toggleInactive: {
        padding: 8,
        borderRadius: 32,
        paddingHorizontal: 30,
    },
    inactiveText: {
        color: Colors.primary,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 16,
        fontWeight: '600',
        margin: 16,
    },
    item: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderColor: Colors.grey,
        borderWidth: 1,
    },
});

export default BottomSheetCustom;
