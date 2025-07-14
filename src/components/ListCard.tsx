// components/ListCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  productName: string;
  price: number;
  checked: boolean;
  onToggle: () => void;
  onDelete: () => void;
  isEco?: boolean;
  ecoScore?: string;
};

export default function ListCard({
  productName,
  price,
  checked,
  onToggle,
  onDelete,
  isEco = false,
  ecoScore = 'F',
}: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onToggle} style={styles.left}>
        <FontAwesome5
          name={checked ? 'check-circle' : 'circle'}
          size={22}
          color={checked ? '#4caf50' : '#ccc'}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{productName}</Text>
          <Text style={styles.price}>₹{price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.right}>
        {isEco && (
          <View style={styles.ecoTag}>
            <FontAwesome5 name="leaf" size={12} color="#4caf50" />
            <Text style={styles.ecoText}>Eco {ecoScore}</Text>
          </View>
        )}
        <TouchableOpacity onPress={onDelete}>
          <FontAwesome5 name="trash" size={18} color="#d00000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  right: {
    alignItems: 'flex-end',
    gap: 8,
  },
  name: { fontWeight: '600', fontSize: 16 },
  price: { fontSize: 13, color: '#666' },
  ecoTag: {
    flexDirection: 'row',
    backgroundColor: '#e6f4ea',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 4,
  },
  ecoText: {
    fontSize: 12,
    color: '#4caf50',
    marginLeft: 4,
    fontWeight: '600',
  },
});
