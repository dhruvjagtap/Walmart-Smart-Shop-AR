import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
  Login: undefined;
  Home: undefined;
  BottomTabs: undefined;
};

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .required('Confirm your password'),
});

export default function SignUp() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values: any) => {
    if (loading) return;
    setLoading(true);

    const { name, email, password } = values;

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredential.user.updateProfile({ displayName: name });

      await firestore().collection('users').doc(userCredential.user.uid).set(
        {
          name,
          email,
          role: 'customer',
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      navigation.replace('BottomTabs');
    } catch (error: any) {
      console.log('Error creating account: ', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email already in use. Please try another email.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email format. Please enter a valid email.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Password is too weak. Please choose a stronger password.');
      } else {
        Alert.alert('An unexpected error occurred. Please try again later.');
      }
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
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
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
              placeholder="Name"
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
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

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                style={styles.passwordInput}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                style={styles.icon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            {loading ? (
              <ActivityIndicator size="large" color="#d81e5b" />
            ) : (
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Sign Up"
                  onPress={handleSubmit as any}
                  disabled={loading}
                />
              </View>
            )}
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>
          Already have an Account?{' '}
          <Text style={{ color: '#d81e5b' }}>Login</Text>
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
    alignSelf: 'center',
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
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e0e1dd',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    color: '#000',
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    color: '#8d99ae',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
