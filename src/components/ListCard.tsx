import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ShoppingListComponentProps {
  productName: string;
  brandName?: string;
  onDelete?: () => void;
  onToggle?: () => void;
  checked?: boolean;
  price?: number;
}

export default function ListCard({
  productName,
  brandName = '',
  onDelete,
  onToggle,
  checked = false,
  price,
}: ShoppingListComponentProps) {
  // Remove brand from start of product name if present
  const cleanedProductName = productName
    .replace(new RegExp(`^${brandName}\\s*`, 'i'), '')
    .trim();

  console.log('ListCard rendered with product:', productName);

  return (
    <View style={styles.container}>
      {/* Left Side: Checkbox + Product Info */}
      <TouchableOpacity
        style={styles.leftSection}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Feather
          name={checked ? 'check-square' : 'square'}
          size={24}
          color="#3a86ff"
        />
        <View style={styles.nameBlock}>
          <Text style={checked ? styles.checkedText : styles.productName}>
            {cleanedProductName}
          </Text>
          {brandName ? <Text style={styles.brandName}>{brandName}</Text> : null}
        </View>
      </TouchableOpacity>

      {/* Right Side: Price + Delete */}
      <View style={styles.rightSection}>
        {price !== undefined && (
          <Text style={styles.price}>₹{price.toFixed(2)}</Text>
        )}
        <TouchableOpacity onPress={onDelete}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="#adb5bd"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    marginVertical: 6,
    elevation: 2,
    // backgroundColor: '#ffe6e6', // light pink background for test
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameBlock: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  checkedText: {
    fontSize: 16,
    color: '#adb5bd',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  brandName: {
    fontSize: 14,
    color: '#495057',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 16,
    color: '#38b000',
    fontWeight: '500',
  },
});
