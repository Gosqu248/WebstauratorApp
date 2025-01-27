import React from 'react'
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';


const PaymentView = () => {
    const route = useRoute();
    const { uri } = route.params;

    return (
        <WebView
            source={{ uri }}
            onNavigationStateChange={(navState) => {
            }}
        />
    );
};
export default PaymentView
