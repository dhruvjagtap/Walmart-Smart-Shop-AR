import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton';

type AuthStackParamList = {
  SignUp: undefined;
  BottomTabs: undefined;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const uid = userCredential.user.uid;
      const userDoc = await firestore().collection('users').doc(uid).get();

      if (!userDoc.exists) {
        Alert.alert('User data not found');
        return;
      }

      const userData = userDoc.data();
      if (userData?.role === 'customer') {
        Alert.alert(
          'Login Successful',
          `Welcome back, ${userCredential.user.displayName?.split(' ')[0]}`,
        );
        navigation.replace('BottomTabs');
      } else {
        Alert.alert('Access Denied', 'You are not authorized as a customer.');
        await auth().signOut();
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome to SmartShop AR</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={() => Alert.alert('Forgot password coming soon!')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {loading ? (
              <ActivityIndicator size="large" color="#d81e5b" />
            ) : (
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Login"
                  onPress={handleSubmit as any}
                  disabled={loading}
                />
              </View>
            )}
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.text}>
          Don't have an account?{' '}
          <Text style={{ color: '#d81e5b' }}>Sign Up</Text>
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
    marginBottom: 30,
    alignItems: 'center',
  },
  heading: {
    fontWeight: '800',
    color: '#000000',
    fontSize: 28,
    textAlign: 'center',
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
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  forgotText: {
    color: '#d81e5b',
    textAlign: 'right',
    marginBottom: 30,
  },
  text: {
    color: '#8d99ae',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleContainer: {
    alignSelf: 'center',
  },
  icon: {
    color: '#000',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
});
