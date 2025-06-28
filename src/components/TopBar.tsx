import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface TopBarProps {
  showGreeting: boolean;
  title?: string;
}

export default function TopBar({ showGreeting, title }: TopBarProps) {
  const [userName, setUserName] = useState<string>('Shopper');

  useEffect(() => {
    const user = auth().currentUser;
    if (user?.displayName) {
      setUserName(user.displayName);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={showGreeting ? styles.greetingText : styles.title}>
        {showGreeting ? `Hi, ${userName}` : title || 'Welcome to the App'}
      </Text>
      <View style={styles.rightSection}>
        <FontAwesome
          name="bell-o"
          size={24}
          color="#fb8500"
          style={styles.icon}
        />
        <TouchableOpacity>
          <Image
            style={styles.profileImage}
            source={require('../assets/images/profile.jpg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    padding: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
