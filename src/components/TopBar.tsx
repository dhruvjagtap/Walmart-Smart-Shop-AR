import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal } from 'react-native-paper';

interface TopBarProps {
  showGreeting: boolean;
  title?: string;
}

export default function TopBar({ showGreeting, title }: TopBarProps) {
  const [userName, setUserName] = useState<string>('Shopper');
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (user?.displayName) {
      setUserName(user.displayName);
    }
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {!showGreeting && (
          <Feather name="arrow-left" size={20} onPress={handleGoBack} />
        )}
        <Text style={showGreeting ? styles.greetingText : styles.title}>
          {showGreeting ? `Hi, ${userName}` : title || 'Welcome to the App'}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <FontAwesome
          name="bell-o"
          size={20}
          color="#d81e5b"
          style={styles.icon}
        />
        <TouchableOpacity
          onPress={() => {
            setProfileModalVisible(true);
          }}
        >
          <Image
            style={styles.profileImage}
            source={require('../assets/images/profile.jpg')}
          />
        </TouchableOpacity>
        <Portal>
          <Modal
            visible={profileModalVisible}
            onDismiss={() => setProfileModalVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.userNameText}>Hi, {userName}</Text>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  /* Handle add account */
                }}
              >
                <Ionicons name="add-circle-outline" size={20} color="#000" />
                <Text style={styles.modalItemText}>Add Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  auth().signOut();
                }}
              >
                <Feather name="log-out" size={20} color="#000" />
                <Text style={styles.modalItemText}>Log Out</Text>
              </TouchableOpacity>

              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Portal>
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
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
  },

  modalContent: {
    gap: 15,
  },

  userNameText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },

  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 5,
  },

  modalItemText: {
    fontSize: 16,
  },

  modalActions: {
    marginTop: 20,
    alignItems: 'flex-end',
  },

  cancelText: {
    color: '#888',
    fontSize: 16,
  },
});
