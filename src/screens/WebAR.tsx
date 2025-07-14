import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ARScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar title="AR" showGreeting={false} />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Floating Arrow */}

        <Text style={styles.arrow}>➡️</Text>

        {/* Floating Product Tag */}
        <View
          style={[
            styles.tag,
            { top: screenHeight * 0.4, left: screenWidth * 0.3 },
          ]}
        >
          <Text style={styles.tagName}>Oat Milk</Text>
          <Text style={styles.tagDeal}>20% OFF · Eco-Friendly</Text>
        </View>

        {/* Second Product Tag */}
        <View
          style={[
            styles.tag,
            { top: screenHeight * 0.55, left: screenWidth * 0.6 },
          ]}
        >
          <Text style={styles.tagName}>Granola</Text>
          <Text style={styles.tagDeal}>Buy 1 Get 1 Free</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  arrow: {
    fontSize: 60,
    position: 'absolute',
    top: '30%',
    left: '45%',
  },
  tag: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  tagName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagDeal: {
    fontSize: 12,
    color: '#4caf50',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
});
