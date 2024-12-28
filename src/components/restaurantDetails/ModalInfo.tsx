import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Info from "@/src/components/restaurantDetails/Info";
import {useTranslation} from "react-i18next";
import {Restaurant} from "@/src/interface/restaurant";
import Opinions from "@/src/components/restaurantDetails/Opinions";

const ModalInfo = ({ isVisible, onClose, restaurant }: { isVisible: boolean; onClose: () => void, restaurant: Restaurant }) => {
    const [selectedSection, setSelectedSection] = useState<'opinion' | 'info'>('info');
    const { t } = useTranslation();

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={30} color={Colors.iconOrange} />
                        </TouchableOpacity>
                        <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.sectionButton, selectedSection === 'info' && styles.activeButton]}
                            onPress={() => setSelectedSection('info')}
                        >
                            <Text style={styles.buttonText}>{t('info')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.sectionButton, selectedSection === 'opinion' && styles.activeButton]}
                            onPress={() => setSelectedSection('opinion')}
                        >
                            <Text style={styles.buttonText}>{t('opinions')}</Text>
                        </TouchableOpacity>


                    </View>
                    {selectedSection === 'opinion' ? (
                        <Opinions restaurant={restaurant}></Opinions>
                    ) : (
                        <Info restaurant={restaurant as Restaurant}/>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'flex-end', // Align modal at the bottom
    },
    modalContent: {
        width: '100%',
        height: '94%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content at the top
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 20,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        padding: 10,
    },
    restaurantName: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 40,
    },
    sectionButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeButton: {
        borderBottomColor: Colors.iconOrange,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
});
export default ModalInfo;
