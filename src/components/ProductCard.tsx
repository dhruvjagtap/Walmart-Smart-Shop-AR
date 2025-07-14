import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types/Product';

export default function ProductCard({
  discount,
  imageUrl,
  name,
  originalPrice,
  salePrice,
  onPress,
}: Product & { onPress: () => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.discount}>{discount}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>
        <Text style={styles.strikethrough}>${originalPrice}</Text>{' '}
        <Text style={styles.sale}>${salePrice}</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>+ Add to List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  discount: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#3a86ff',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 12, marginBottom: 8 },
  strikethrough: { textDecorationLine: 'line-through', color: '#888' },
  sale: { color: '#fb8500', fontWeight: 'bold' },
  button: {
    backgroundColor: '#3a86ff',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 13, fontWeight: '500' },
});
