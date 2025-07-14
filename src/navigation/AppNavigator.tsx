import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';
import BottomTabs from './BottomTabs';
import { ProductProvider } from '../context/ProductContext';
import ARScreen from '../screens/WebAR';
import VoiceAssistantOverlay from '../components/VoiceAssistantOverlay';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [role, setRole] = useState<'customer' | 'provider' | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      setUser(user);

      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const data = userDoc.data();
        if (data?.role === 'customer' || data?.role === 'employee') {
          setRole(data.role);
        }
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <ActivityIndicator
        size="large"
        color="#d81e5b"
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      />
    );
  }
  return (
    <NavigationContainer>
      <ProductProvider>
        {user && (
          <VoiceAssistantOverlay
            getAppData={() => ({
              shoppingTotal: 1249,
              ecoPoints: 3,
              productLocations: {
                'oat milk': 'Aisle 7',
                granola: 'Aisle 5',
              },
            })}
          />
        )}

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
            <>
              <Stack.Screen name="BottomTabs" component={BottomTabs} />
            </>
          )}
        </Stack.Navigator>
      </ProductProvider>
    </NavigationContainer>
  );
}
