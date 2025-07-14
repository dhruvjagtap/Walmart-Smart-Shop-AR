import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from '../components/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useProductContext } from '../context/ProductContext';
type ProductItem = {
  id?: string;
  name: string;
  brand?: string;
  price: number;
  checked: boolean;
  isEcoFriendly?: boolean;
  ecoScore?: string;
};

export default function EcoWallet() {
  const [ecoItems, setEcoItems] = useState<ProductItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const user = auth().currentUser;
  const { confirmedItems, setConfirmedItems } = useProductContext();

  const loadData = async () => {
    try {
      let confirmedList: ProductItem[] = [];

      if (user) {
        const doc = await firestore().collection('users').doc(user.uid).get();
        confirmedList = doc.data()?.confirmedList || [];
      } else {
        const raw = await AsyncStorage.getItem('@smartshop_confirmedList');
        confirmedList = raw ? JSON.parse(raw) : [];
      }

      const ecoChecked = confirmedList.filter(
        item => item.checked && item.isEcoFriendly,
      );
      setEcoItems(ecoChecked);
    } catch (e) {
      console.error('EcoWallet load error', e);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      if (!user) {
        const raw = await AsyncStorage.getItem('@smartshop_confirmedList');
        if (raw) setConfirmedItems(JSON.parse(raw));
      } else {
        const doc = await firestore().collection('users').doc(user.uid).get();
        const list = doc.data()?.confirmedList || [];
        setConfirmedItems(list);
      }
    };
    loadInitial();
  }, []);

  useEffect(() => {
    // Filter fresh context data
    const ecoChecked = confirmedItems.filter(
      item => item.checked && item.isEcoFriendly,
    );
    setEcoItems(ecoChecked);
  }, [confirmedItems]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const ecoPoints = ecoItems.length * 5;
  const goal = 1000;
  const percentage = Math.min(Math.round((ecoPoints / goal) * 100), 100);

  const impactData = [
    {
      icon: 'leaf',
      label: 'CO2 Saved',
      value: (ecoItems.length * 5).toFixed(1),
      unit: 'kg',
      sub: 'Equivalent to planting trees.',
      color: '#4caf50',
    },
    {
      icon: 'recycle',
      label: 'Plastic Avoided',
      value: (ecoItems.length * 0.5).toFixed(1),
      unit: 'kg',
      sub: 'Avoided single-use plastics.',
      color: '#3f51b5',
    },
    {
      icon: 'bolt',
      label: 'Energy Saved',
      value: (ecoItems.length * 2).toFixed(1),
      unit: 'kWh',
      sub: 'Reduced electricity consumption.',
      color: '#ff9800',
    },
    {
      icon: 'water',
      label: 'Water Conserved',
      value: (ecoItems.length * 15).toFixed(1),
      unit: 'L',
      sub: 'From efficient resource use.',
      color: '#00bcd4',
    },
  ];

  const allBadges = [
    {
      icon: 'medal',
      title: 'Recycling Champion',
      sub: '100+ eco points',
      unlockAt: 100,
    },
    {
      icon: 'bus',
      title: 'Green Commuter',
      sub: '300+ eco points',
      unlockAt: 300,
    },
    {
      icon: 'leaf',
      title: 'Zero Waste Hero',
      sub: '500+ eco points',
      unlockAt: 500,
    },
    {
      icon: 'cloud-outline',
      title: 'Carbon Saver',
      sub: '750+ eco points',
      unlockAt: 750,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopBar title="Eco Wallet" showGreeting={false} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#d81e5b']}
          />
        }
      >
        <Text style={styles.sectionTitle}>Your Eco Impact</Text>
        <View style={styles.grid}>
          {impactData.map((item, index) => (
            <View key={index} style={styles.card}>
              <FontAwesome5 name={item.icon} size={24} color={item.color} />
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>
                {item.value}
                <Text style={styles.cardUnit}> {item.unit}</Text>
              </Text>
              <Text style={styles.cardSub}>{item.sub}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Eco Progress</Text>
        <View style={styles.progressCard}>
          <Text style={styles.progressText}>Goal Progress</Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${percentage}%` }]}
            />
          </View>
          <Text style={styles.points}>
            {ecoPoints} / {goal} Points
          </Text>
          <Text style={styles.percentage}>{percentage}% Complete</Text>
        </View>

        <Text style={styles.sectionTitle}>Badges Earned</Text>
        <View style={styles.badgeGrid}>
          {allBadges.map((badge, i) => {
            const unlocked = ecoPoints >= badge.unlockAt;
            return (
              <View
                key={i}
                style={[styles.badgeCard, { opacity: unlocked ? 1 : 0.4 }]}
              >
                <MaterialCommunityIcons
                  name={badge.icon as any}
                  size={24}
                  color={unlocked ? '#3a86ff' : '#aaa'}
                />
                <Text style={styles.badgeTitle}>{badge.title}</Text>
                <Text style={styles.badgeSub}>{badge.sub}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Eco Tips</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipRow}>
            <Ionicons name="warning" size={24} color="#ffa500" />
            <Text style={styles.tipTitle}>
              Daily Eco Challenge: Reduce Food Waste
            </Text>
          </View>
          <Text style={styles.tipText}>
            Plan meals, store food properly, and compost leftovers to reduce
            environmental impact.
          </Text>
          <TouchableOpacity
            style={styles.tipButton}
            onPress={() =>
              Linking.openURL(
                'https://en.wikipedia.org/wiki/Food_loss_and_waste',
              )
            }
          >
            <Text style={styles.tipButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  cardLabel: { fontSize: 14, fontWeight: '600', marginTop: 6 },
  cardValue: { fontSize: 22, fontWeight: 'bold', marginVertical: 4 },
  cardUnit: { fontSize: 14, color: '#555' },
  cardSub: { fontSize: 12, color: '#777' },
  progressCard: {
    backgroundColor: '#f1f3f5',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  progressText: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#d81e5b',
    borderRadius: 8,
  },
  points: { fontSize: 14, marginTop: 6, fontWeight: '600' },
  percentage: { fontSize: 12, color: '#888' },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  badgeTitle: { fontWeight: 'bold', marginTop: 4 },
  badgeSub: { fontSize: 12, color: '#666' },
  tipCard: {
    backgroundColor: '#fffbe6',
    borderColor: '#ffe58f',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 40,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipTitle: { fontWeight: 'bold', fontSize: 14, flex: 1 },
  tipText: { fontSize: 13, color: '#555', marginBottom: 10 },
  tipButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#e6f0ff',
    borderRadius: 6,
  },
  tipButtonText: { color: '#3a86ff', fontWeight: '600' },
});
