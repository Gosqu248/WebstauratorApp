import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/src/screens/HomeScreen';
import CustomHeader from '@/src/components/home/CustomHeader';
import '@/src/language/i18n'
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {DrawerLayout, GestureHandlerRootView} from "react-native-gesture-handler";
import {useEffect, useRef} from "react";
import SideMenu from "@/src/components/home/SideMenu";
import LocationSearch from "@/src/screens/LocationSearch";
import RestaurantDetails from "@/src/screens/RestaurantDetails";
import Basket from "@/src/screens/Basket";
import {useTranslation} from "react-i18next";
import Login from "@/src/screens/Login";
import Register from "@/src/screens/Register";
import Order from "@/src/screens/Order";
import useAuthStore from "@/src/zustand/auth";
import PaymentView from "@/src/screens/PaymentView";
import OrdersHistory from "@/src/screens/OrdersHistory";


const Stack = createNativeStackNavigator();

export default function App() {
    const drawerRef = useRef<DrawerLayout>(null);
    const {t} = useTranslation();
    const initializeAuth = useAuthStore(state => state.initializeAuth);

    useEffect(() => {
        initializeAuth();
    }, []);

    const openDrawer = () => {
        drawerRef.current?.openDrawer();
    };

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                    <NavigationContainer>
                <DrawerLayout
                    ref={drawerRef}
                    drawerWidth={320}
                    drawerPosition="right"
                    renderNavigationView={() => <SideMenu/>}
                >
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{
                                    header: () => <CustomHeader openDrawer={openDrawer}/>
                                }}
                            />
                            <Stack.Screen
                                name="LocationSearch"
                                component={LocationSearch}
                                options={{
                                    presentation: 'fullScreenModal',
                                    headerTitle: 'Search location',
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <Stack.Screen
                                name="RestaurantDetails"
                                component={RestaurantDetails}
                                options={{
                                    presentation: 'fullScreenModal',
                                    headerTitle: 'RestaurantDetails',
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <Stack.Screen
                                name="Basket"
                                component={Basket}
                                options={{
                                    presentation: 'fullScreenModal',
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{
                                    presentation: 'fullScreenModal',
                                    headerTitle: t('login'),
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{
                                    presentation: 'fullScreenModal',
                                    headerTitle: t('register'),
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <Stack.Screen
                                name="Order"
                                component={Order}
                                options={{
                                    presentation: 'fullScreenModal',
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <Stack.Screen
                                name="Payment"
                                component={PaymentView}
                                options={{
                                    presentation: 'fullScreenModal',
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <Stack.Screen
                                name="OrdersHistory"
                                component={OrdersHistory}
                                options={{
                                    presentation: 'fullScreenModal',
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                        </Stack.Navigator>
                </DrawerLayout>
                    </NavigationContainer>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}


