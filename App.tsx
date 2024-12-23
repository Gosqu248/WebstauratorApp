import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/src/screens/HomeScreen';
import CustomHeader from '@/src/components/home/CustomHeader';
import '@/src/language/i18n'
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
           <NavigationContainer>
             <Stack.Navigator>
              <Stack.Screen
               name="Home"
                component={HomeScreen}
                options={{
                  header: () => <CustomHeader />
                }}
                />
            </Stack.Navigator>
           </NavigationContainer>
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
