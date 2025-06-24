import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type AuthStackParamList = {
  Home: undefined;
  SignUp: undefined;
};
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const handleLogin = async () => {
    if (loading) return;

    if (!email || !password) {
      Alert.alert('Please fill in all fields');
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const uid = userCredential.user.uid;

      const userDoc = await firestore().collection('users').doc(uid).get();

      if (!userDoc.exists) {
        Alert.alert('User data not found');
        setLoading(false);
        return;
      }

      const userData = userDoc.data();

      if (userData?.role === 'customer') {
        Alert.alert(
          'Login Successful',
          `Welcome back, ${userCredential.user.displayName?.split(' ')[0]}`,
        );

        navigation.replace('Home');
      } else {
        Alert.alert('Access Denied', 'You are not authorized as a customer.');
        await auth().signOut(); // Optional: Sign them out
      }
    } catch (error: any) {
      console.log('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    }
  };

  const toSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgetPassword = () => {
    console.log('forget Password');
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome to SmartShop AR</Text>
      </View>
      <TextInput
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={20}
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <TouchableOpacity onPress={handleForgetPassword}>
        <Text
          style={{ color: '#fb8500', paddingHorizontal: 5, marginBottom: 30 }}
        >
          Forget Password
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} disabled={loading} />
      </View>
      <TouchableOpacity style={styles.toggleContainer} onPress={toSignUp}>
        <Text style={styles.text}>
          Don't have an account ?{' '}
          <Text style={{ color: '#fb8500' }}>Sign Up</Text>{' '}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  headingContainer: {
    width: '80%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  heading: {
    fontWeight: '800',
    color: '#000000',
    fontSize: 32,
    marginBottom: 20,
    alignSelf: 'center',
  },

  input: {
    width: '100%',
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e0e1dd',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e1dd',
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    color: '#dad7cd',
    paddingHorizontal: 8,
  },
  text: {
    color: '#8d99ae',
    paddingHorizontal: 5,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingLeft: 50,
  },
  toggleContainer: {
    alignSelf: 'center',
  },
});
