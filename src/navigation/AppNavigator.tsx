import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';
import BottomTabs from './BottomTabs';

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
        color="#fb8500"
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          // Main App Stack
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
