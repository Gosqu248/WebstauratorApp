import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/src/screens/HomeScreen';
import CustomHeader from '@/src/components/home/CustomHeader';
import '@/src/language/i18n'
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {DrawerLayout, GestureHandlerRootView} from "react-native-gesture-handler";
import {useRef} from "react";
import SideMenu from "@/src/components/home/SideMenu";


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
