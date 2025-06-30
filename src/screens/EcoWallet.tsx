// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Linking,
// } from 'react-native';
// import TopBar from '../components/TopBar';
// import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// export default function EcoWallet() {
//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 50 }}>
//       <TopBar title="Eco Wallet" showGreeting={false} />
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Eco Impact Container */}

//         <Text style={styles.heading}>Your Eco Impact</Text>
//         <View style={styles.grid}>
//           {/* CARD 1: CO2 Saved */}
//           <View style={styles.ecoCard}>
//             <Image
//               source={require('../assets/images/leaf.png')}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//             <Text style={styles.title}>
//               CO
//               <Text style={styles.coSub}>2</Text> Saved
//             </Text>
//             <Text style={styles.value}>
//               125 <Text style={styles.unit}>kg</Text>
//             </Text>
//             <Text style={styles.description}>
//               Equivalent to planting 2 trees.
//             </Text>
//           </View>

//           {/* CARD 2: Water Saved */}
//           <View style={styles.ecoCard}>
//             <Image
//               source={require('../assets/images/water.png')}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//             <Text style={styles.title}>Water Saved</Text>
//             <Text style={styles.value}>
//               300 <Text style={styles.unit}>L</Text>
//             </Text>
//             <Text style={styles.description}>Enough for 2 showers.</Text>
//           </View>

//           {/* CARD 3: Plastic Reduced */}
//           <View style={styles.ecoCard}>
//             <Image
//               source={require('../assets/images/recycle.png')}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//             <Text style={styles.title}>Plastic Reduced</Text>
//             <Text style={styles.value}>
//               12 <Text style={styles.unit}>items</Text>
//             </Text>
//             <Text style={styles.description}>Less plastic in landfills.</Text>
//           </View>

//           {/* CARD 4: Energy Saved */}
//           <View style={styles.ecoCard}>
//             <Image
//               source={require('../assets/images/energy.png')}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//             <Text style={styles.title}>Energy Saved</Text>
//             <Text style={styles.value}>
//               20 <Text style={styles.unit}>kWh</Text>
//             </Text>
//             <Text style={styles.description}>Enough to charge 4 phones.</Text>
//           </View>
//         </View>

//         {/* Eco Progress Container */}

//         <View style={styles.ecoContainer}>
//           <Text style={styles.heading}>Eco Progress</Text>

//           <View style={styles.progressContainer}>
//             <View style={styles.progressHeader}>
//               <Text style={styles.title}>Overall Eco Goal</Text>
//               <Text style={styles.percentageText}>
//                 75% <Text style={styles.unit}>Complete</Text>
//               </Text>
//             </View>

//             <View style={styles.pointsRow}>
//               <Text style={styles.value}>750</Text>
//               <Text style={styles.unit}>/ 1000 points</Text>
//             </View>

//             <View style={styles.progressTrack}>
//               <View style={[styles.progressBarFill, { width: '75%' }]} />
//             </View>
//           </View>
//         </View>

//         {/* Badges Container */}
//         <Text style={styles.heading}>Badges Earned</Text>
//         <View style={styles.grid}>
//           <View style={styles.ecoCard}>
//             <View
//               style={{
//                 justifyContent: 'space-between',
//                 flexDirection: 'row',
//                 gap: 8,
//                 padding: 20,
//               }}
//             >
//               <Image
//                 source={require('../assets/images/recycle1.png')}
//                 style={styles.icon}
//                 resizeMode="contain"
//               />
//               <Text style={styles.title}>Recycling Champion</Text>
//             </View>
//             <Text style={styles.description}>
//               Achieved by consistent waste sorting.
//             </Text>
//           </View>
//           <View style={styles.ecoCard}>
//             <View
//               style={{
//                 justifyContent: 'space-between',
//                 flexDirection: 'row',
//                 gap: 8,
//                 padding: 20,
//               }}
//             >
//               <Image
//                 source={require('../assets/images/bus.png')}
//                 style={styles.icon}
//                 resizeMode="contain"
//               />
//               <Text style={styles.title}>Green Commuter</Text>
//             </View>
//             <Text style={styles.description}>
//               For choosing eco-friendly transport.
//             </Text>
//           </View>
//           <View style={styles.ecoCard}>
//             <View
//               style={{
//                 justifyContent: 'space-between',
//                 flexDirection: 'row',
//                 gap: 8,
//                 padding: 20,
//               }}
//             >
//               <Image
//                 source={require('../assets/images/shopCart.png')}
//                 style={styles.icon}
//                 resizeMode="contain"
//               />
//               <Text style={styles.title}>Zero Waste Hero</Text>
//             </View>
//             <Text style={styles.description}>
//               Successfully minimized household waste.
//             </Text>
//           </View>
//           <View style={styles.ecoCard}>
//             <View
//               style={{
//                 justifyContent: 'space-between',
//                 flexDirection: 'row',
//                 gap: 8,
//                 padding: 20,
//               }}
//             >
//               <Image
//                 source={require('../assets/images/tree.png')}
//                 style={styles.icon}
//                 resizeMode="contain"
//               />
//               <Text style={styles.title}>Carbon Saver</Text>
//             </View>
//             <Text style={styles.description}>
//               Reduced your carbon footprint significantly.
//             </Text>
//           </View>
//         </View>
//         <View
//           style={{
//             marginTop: 0,
//             backgroundColor: '#ced4da',
//             width: '100%',
//             borderWidth: 1,
//             borderRadius: 2,
//             borderColor: '#ced4da',
//             marginBottom: 10,
//           }}
//         />
//         <View style={styles.tipsContainer}>
//           <Text style={styles.header}>Eco Tips & Challenges</Text>

//           <View style={styles.tipsCard}>
//             <View style={styles.iconTitleRow}>
//               <Ionicons name="sparkles-outline" size={18} color="#ffb703" />
//               <View style={styles.titleWrapper}>
//                 <Text style={styles.title}>
//                   Daily Eco Challenge: Reduce Food Waste!
//                 </Text>
//               </View>
//             </View>

//             <Text style={styles.description1}>
//               Did you know that reducing food waste is one of the easiest ways
//               to lower your carbon footprint? Aim to plan your meals, store food
//               properly, and compost leftovers.
//             </Text>

//             <TouchableOpacity
//               style={styles.learnMoreButton}
//               onPress={() =>
//                 Linking.openURL(
//                   'https://en.wikipedia.org/wiki/Food_loss_and_waste',
//                 )
//               }
//             >
//               <Text style={styles.learnMoreText}>Learn More</Text>
//               <Feather name="arrow-right" size={16} color="#3a86ff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 16,
//     paddingRight: 190,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   ecoCard: {
//     width: '47%',
//     aspectRatio: 1,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 20,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     borderColor: '#EBEBEAFF',
//     borderWidth: 1,
//     elevation: 5,
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#242524',
//   },
//   coSub: {
//     fontSize: 10,
//     lineHeight: 16,
//     color: '#242524',
//   },
//   value: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#3a86ff',
//   },
//   unit: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#8C8D8B',
//   },
//   description: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#8C8D8B',
//     alignSelf: 'flex-start',
//   },
//   ecoContainer: {
//     padding: 10,
//     paddingEnd: 10,
//     width: '100%',
//     borderWidth: 2,
//     borderRadius: 2,
//     borderLeftColor: '#fff',
//     borderRightColor: '#fff',
//     borderBottomColor: '#ced4da',
//     borderTopColor: '#ced4da',
//     marginBottom: 10,
//   },
//   progressContainer: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#d3d3d3',
//     borderRadius: 10,
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//     marginBottom: 20,
//   },

//   progressHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },

//   pointsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'baseline',
//     marginBottom: 10,
//   },

//   progressTrack: {
//     width: '100%',
//     height: 12,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 6,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   progressBarFill: {
//     height: '100%',
//     backgroundColor: '#fb8500',
//     borderRadius: 6,
//     position: 'absolute', // Make sure it starts from left
//     left: 0,
//     top: 0,
//   },

//   percentageText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#fb8500',
//   },
//   tipsContainer: {
//     padding: 16,
//     width: '100%',
//     marginBottom: 5,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 16,
//   },
//   tipsCard: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ced4da',
//     padding: 16,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   iconTitleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     // gap: 8,
//   },
//   titleWrapper: {
//     flexShrink: 1,
//     flexGrow: 1,
//     flexBasis: 0,
//     marginLeft: 8,
//   },

//   title1: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     flexWrap: 'wrap',
//   },
//   description1: {
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 20,
//     marginBottom: 12,
//   },
//   learnMoreButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#3a86ff',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     alignSelf: 'flex-start',
//   },
//   learnMoreText: {
//     color: '#3a86ff',
//     marginRight: 4,
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });

// // can you make this code good

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from '../components/TopBar';

const EcoWallet = () => {
  const screenWidth = Dimensions.get('window').width;
  const progress = 750; // Example points
  const goal = 1000;
  const percentage = Math.round((progress / goal) * 100);

  const impactData = [
    {
      icon: 'leaf',
      label: 'CO2 Saved',
      value: '125',
      unit: 'kg',
      sub: 'Equivalent to planting 2 trees.',
      color: '#4caf50',
    },
    {
      icon: 'recycle',
      label: 'Plastic Avoided',
      value: '3.5',
      unit: 'kg',
      sub: 'Through reusable bags & containers.',
      color: '#3f51b5',
    },
    {
      icon: 'bolt',
      label: 'Energy Saved',
      value: '50',
      unit: 'kWh',
      sub: 'Reduced electricity consumption.',
      color: '#ff9800',
    },
    {
      icon: 'water',
      label: 'Water Conserved',
      value: '750',
      unit: 'L',
      sub: 'From efficient water use at home.',
      color: '#00bcd4',
    },
  ];

  const badges = [
    {
      icon: 'medal',
      title: 'Recycling Champion',
      sub: 'Achieved by recycling',
    },
    { icon: 'bus', title: 'Green Commuter', sub: 'For choosing eco travel' },
    { icon: 'leaf', title: 'Zero Waste Hero', sub: 'Minimized your waste' },
    {
      icon: 'cloud-outline',
      title: 'Carbon Saver',
      sub: 'Reduced your carbon footprint',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 50 }}>
      <TopBar title="Eco Wallet" showGreeting={false} />
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text style={styles.sectionTitle}>Your Eco Impact</Text>

        {/* Eco Impact Cards */}
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

        {/* Eco Progress */}
        <Text style={styles.sectionTitle}>Eco Progress</Text>
        <View style={styles.progressCard}>
          <Text style={styles.progressText}>Overall Eco Goal</Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${percentage}%` }]}
            />
          </View>
          <Text style={styles.points}>
            {progress} / {goal} Points
          </Text>
          <Text style={styles.percentage}>{percentage}% Complete</Text>
        </View>

        {/* Badges */}
        <Text style={styles.sectionTitle}>Badges Earned</Text>
        <View style={styles.badgeGrid}>
          {badges.map((badge, index) => (
            <View key={index} style={styles.badgeCard}>
              <MaterialCommunityIcons
                name={badge.icon as any}
                size={24}
                color="#666"
              />
              <Text style={styles.badgeTitle}>{badge.title}</Text>
              <Text style={styles.badgeSub}>{badge.sub}</Text>
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <Text style={styles.sectionTitle}>Eco Tips & Challenges</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipRow}>
            <Ionicons name="warning" size={24} color="#ffa500" />
            <Text style={styles.tipTitle}>
              Daily Eco Challenge: Reduce Food Waste!
            </Text>
          </View>
          <Text style={styles.tipText}>
            Did you know that reducing food waste is one of the easiest ways to
            lower your carbon footprint? Aim to plan your meals, store food
            properly, and compost leftovers.
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 50,
  },
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
    backgroundColor: '#fb8500',
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

export default EcoWallet;
