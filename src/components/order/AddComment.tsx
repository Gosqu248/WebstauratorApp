import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/Colors';
import {useOrderStore} from "@/src/zustand/order";

const AddComment = () => {
    const { t } = useTranslation();
    const setComment = useOrderStore(state => state.setComment);

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>{t('addComment')}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={t('relevantInformation')}
                onChangeText={(text) => setComment(text)}
                multiline
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    textInput: {
        width: '100%',
        height: 'auto',
        minHeight: 50,
        borderColor: '#e5e5e5',
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
});

export default AddComment;
