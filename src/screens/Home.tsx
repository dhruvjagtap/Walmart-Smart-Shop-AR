import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import TopBar from '../components/TopBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  WebAR: undefined;
  MockARScreen: undefined;
};

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleLogout = async () => {
    try {
      await auth().signOut();
      // TODO: Navigate to Login screen after logout
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleShopWithAR = () => {
    navigation.navigate('WebAR');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopBar showGreeting={true} />
      <View style={styles.container}>
        <Text style={styles.title}>Your Shopping Hub</Text>
        <View style={styles.card}>
          <View style={styles.inlineContent}>
            <FontAwesome
              name="shopping-cart"
              size={48}
              color={'#3a86ff'}
              style={styles.icon}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.cardTitle}>Start Shopping</Text>
              <Text style={styles.cardDesc}>
                Access your smart shopping list and begin your in-store journey
                effortlessly.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleShopWithAR}
          >
            <Text style={styles.primaryButtonText}>Go to List</Text>
          </TouchableOpacity>
        </View>
        {/* Top Deals Card*/}
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: 'https://cdn.visily.ai/text2design/images/4b2dec26-fd6e-4771-a3e4-ea22fecc0c70.jpg',
            }}
            style={styles.cardImage}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlayContent}>
              <Text style={styles.overlayTitle}>Top Hot Deals</Text>
              <Text style={styles.overlayDesc}>
                Discover the latest offers and discounts tailored just for you.
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>See Deals</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* Eco Wallet Card */}
        <View style={styles.card}>
          <ImageBackground
            source={{
              uri: 'https://cdn.visily.ai/text2design/images/35da3360-2293-4c93-b1ee-144c60c456e1.jpg',
            }}
            style={styles.cardImage}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlayContent}>
              <Text style={styles.overlayTitle}>Eco Wallet Insights</Text>
              <Text style={styles.overlayDesc}>
                Track your environmental impact and earn badges for sustainable
                choices.
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View Wallet</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 0,
  },
  title: {
    color: '#d81e5b',
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 28,
  },

  card: {
    // flex: 1,
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#ced4da',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageStyle: {
    borderRadius: 20,
  },

  overlayContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent overlay
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  overlayTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },

  overlayDesc: {
    color: '#f1f1f1',
    fontSize: 14,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#d81e5b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  inlineContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  icon: {
    marginRight: 16,
  },

  textWrapper: {
    flex: 1,
  },

  primaryButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
