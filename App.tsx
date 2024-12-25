import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/src/screens/HomeScreen';
import CustomHeader from '@/src/components/home/CustomHeader';
import '@/src/language/i18n'
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {DrawerLayout, GestureHandlerRootView} from "react-native-gesture-handler";
import {useRef} from "react";
import SideMenu from "@/src/components/home/SideMenu";
import {Ionicons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import LocationSearch from "@/src/screens/LocationSearch";


const Stack = createNativeStackNavigator();

export default function App() {
    const drawerRef = useRef<DrawerLayout>(null);

    const openDrawer = () => {
        drawerRef.current?.openDrawer();
    };

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <DrawerLayout
                    ref={drawerRef}
                    drawerWidth={320}
                    drawerPosition="right"
                    renderNavigationView={() => <SideMenu/>}
                >
                    <NavigationContainer>
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
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.goBack();
                                            }}>
                                            <Ionicons name='close-outline' size={28} color={Colors.primary}/>
                                        </TouchableOpacity>
                                    ),
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </DrawerLayout>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
