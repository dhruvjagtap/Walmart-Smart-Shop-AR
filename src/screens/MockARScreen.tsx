import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useProductContext } from '../context/ProductContext';

type ProductItem = {
  name: string;
  price: number;
  checked: boolean;
  isEcoFriendly?: boolean;
  ecoScore?: string;
};

export default function MockARScreen() {
  const { lists, selectedListName } = useProductContext();
  const selectedProducts = lists[selectedListName] ?? [];

  return (
    <FlatList
      data={selectedProducts}
      keyExtractor={item => item.id || item.name}
      renderItem={({ item }) => (
        <Text>
          {item.name} - ₹{item.price}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f4ff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  sub: { fontSize: 16, marginVertical: 8 },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    ...Platform.select({
      android: { height: 50 },
    }),
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
  },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  checked: { color: 'green', marginTop: 4 },
  eco: { fontSize: 12, color: 'green' },
  empty: { textAlign: 'center', marginTop: 20 },
});
