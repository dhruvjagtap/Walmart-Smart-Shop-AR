import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';

export default function DealSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.grid}>
        {products.map(item => (
          <ProductCard
            key={item.id}
            {...item}
            onPress={() => console.log('Add to cart:', item.name)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
