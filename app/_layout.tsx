import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {Provider} from "react-redux";
import {store} from "@/store/store";
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import BackButton from "@/components/BackButton";

//tried to use custom icons with IcoMoon, but they're not showing smh
export const Icon = createIconSetFromIcoMoon(
    require('../selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    DosisLight: require('../assets/fonts/TerminalDosis-Light.ttf'),
    DosisRegular: require('../assets/fonts/TerminalDosis-Regular.ttf'),
    DosisSemiBold: require('../assets/fonts/TerminalDosis-SemiBold.ttf'),
    IcoMoon: require('../assets/fonts/icomoon.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const regularBack = require('../assets/icons/back.png')
  const whiteBack = require('../assets/icons/back_white.png')

  return (
      <Provider store={store}>
        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: '#DCCEBE',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'DosisSemiBold',
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}>
          <Stack.Screen name="index" options={{ headerTitle: 'Select Camera and Date' }} />
          <Stack.Screen
              name="photoList"
              options={{
                headerLeft: () => (
                    <BackButton iconSrc={regularBack} />
                )
              }}
          />
          <Stack.Screen
              name="photoShow"
              options={{
                headerLeft: () => (
                    <BackButton iconSrc={whiteBack} />
                )
              }}
          />
        </Stack>
      </Provider>
  );
}
