import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const VoiceAssistantOverlay = ({ getAppData }: { getAppData: () => any }) => {
  const [listening, setListening] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [responseText, setResponseText] = useState('');

  const openAssistant = () => {
    setModalVisible(true);
    setListening(true);
    setSpokenText('');
    setResponseText('Listening...');
    // Optionally start Voice recognition here
  };

  const closeAssistant = () => {
    setModalVisible(false);
    setListening(false);
    setSpokenText('');
    setResponseText('');
    // Optionally stop Voice recognition here
  };

  const handleCommand = (text: string) => {
    const { shoppingTotal, ecoPoints, productLocations } = getAppData();
    const command = text.toLowerCase();

    if (command.includes('where is')) {
      const product = command.replace('where is', '').trim();
      const aisle = productLocations[product];
      if (aisle) {
        setResponseText(`${product} is in ${aisle}`);
      } else {
        setResponseText(`Sorry, I couldn't find ${product}`);
      }
    } else if (command.includes('total')) {
      setResponseText(`Your total is ₹${shoppingTotal}`);
    } else if (command.includes('eco point')) {
      setResponseText(`You have ${ecoPoints} eco points`);
    } else {
      setResponseText("Sorry, I didn't understand that");
    }
  };

  return (
    <>
      {/* Mic Button */}
      <TouchableOpacity style={styles.fab} onPress={openAssistant}>
        <MaterialIcons
          name={listening ? 'mic-off' : 'mic'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Modal Overlay */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeAssistant}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.listeningContainer}>
              <MaterialIcons name="graphic-eq" size={24} color="#3a86ff" />
              <Text style={styles.listeningText}>
                {listening ? 'Listening...' : 'Voice Assistant'}
              </Text>
            </View>

            {/* Command Input */}
            <TextInput
              placeholder="Type a command (e.g., Where is rice)"
              value={spokenText}
              onChangeText={setSpokenText}
              onSubmitEditing={() => {
                handleCommand(spokenText);
              }}
              style={styles.input}
              returnKeyType="done"
            />

            {/* Output Section */}
            <View style={styles.responseBox}>
              <Text style={styles.responseText}>{responseText}</Text>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={closeAssistant}
              style={styles.closeButton}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default VoiceAssistantOverlay;
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 40,
    backgroundColor: '#3a86ff',
    padding: 14,
    borderRadius: 50,
    zIndex: 999,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#3a86ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  responseBox: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    minHeight: 60,
    justifyContent: 'center',
    marginBottom: 20,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#3a86ff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  listeningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // or use marginRight if you're using older RN
    marginBottom: 15,
  },
});
