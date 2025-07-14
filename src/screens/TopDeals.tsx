import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TopBar from '../components/TopBar';
import DealSection from '../components/DealSelection';
import { Product } from '../types/Product';

export default function DealsScreen() {
  const todaysDeals: Product[] = [
    {
      id: '1',
      discount: '33% OFF',
      imageUrl:
        'https://cdn.visily.ai/text2design/images/9bd171d0-7dac-475e-ae56-cf656afd4944.jpg',
      name: 'Organic Red Apple',
      originalPrice: '2.99',
      salePrice: '1.99',
    },
    {
      id: '2',
      discount: '20% OFF',
      imageUrl:
        'https://cdn.visily.ai/text2design/images/f87ca4d5-a48f-4f4e-9430-63459e6e30cf.jpg',
      name: 'Almond Milk (1 Gallon)',
      originalPrice: '3.99',
      salePrice: '3.19',
    },
  ];

  const weeklyEssentials: Product[] = [
    {
      id: '3',
      discount: '25% OFF',
      imageUrl:
        'https://cdn.visily.ai/text2design/images/ea5a9c22-4fff-4512-8234-6ded9b1a30af.jpg',
      name: 'Organic Broccoli Crown',
      originalPrice: '3.99',
      salePrice: '2.99',
    },
    {
      id: '4',
      discount: '20% OFF',
      imageUrl:
        'https://cdn.visily.ai/text2design/images/34d08c4f-c62e-484c-be89-cf6e2d4265d6.jpg',
      name: 'Boneless Chicken Breast',
      originalPrice: '9.99',
      salePrice: '7.99',
    },
  ];

  const limitedTime: Product[] = [
    {
      id: '5',
      discount: '30% OFF',
      imageUrl:
        'https://cdn.visily.ai/text2design/images/55cf56ad-3413-4596-9921-c3633ed14568.jpg',
      name: 'Premium Wireless Headphones',
      originalPrice: '179.99',
      salePrice: '129.99',
    },
    {
      id: '6',
      discount: '33% OFF',
      imageUrl:
        'https://cdn.visily.ai/text2design/images/ec20610a-6cd2-456e-8483-bae97f67c542.jpg',
      name: 'Smart Kitchen Blender',
      originalPrice: '89.99',
      salePrice: '59.99',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopBar title="Top Deals" showGreeting={false} />
      <ScrollView style={styles.container}>
        <DealSection title="Today's Top Deals" products={todaysDeals} />
        <DealSection title="Weekly Essentials" products={weeklyEssentials} />
        <DealSection title="Limited Time Offers" products={limitedTime} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginBottom: 50 },
});
