import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Info = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose} // Close modal on Android back button
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={30} color={Colors.iconOrange} />
                    </TouchableOpacity>
                    <Text style={styles.infoText}>This is the Info modal content!</Text>
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
        height: '100%', // Almost full screen
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
});

export default Info;
