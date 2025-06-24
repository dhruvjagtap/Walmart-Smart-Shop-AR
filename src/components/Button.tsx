import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  disabled: boolean;
  onPress: () => void;
}
export default function Button({ title, disabled, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fb8500',
    marginBottom: 10,
  },

  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
    borderColor: '#999',
  },
});
