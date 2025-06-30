import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import TopBar from '../components/TopBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EcoWallet() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 50 }}>
      <TopBar title="Eco Wallet" showGreeting={false} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Eco Impact Container */}

        <Text style={styles.heading}>Your Eco Impact</Text>
        <View style={styles.grid}>
          {/* CARD 1: CO2 Saved */}
          <View style={styles.ecoCard}>
            <Image
              source={require('../assets/images/leaf.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>
              CO
              <Text style={styles.coSub}>2</Text> Saved
            </Text>
            <Text style={styles.value}>
              125 <Text style={styles.unit}>kg</Text>
            </Text>
            <Text style={styles.description}>
              Equivalent to planting 2 trees.
            </Text>
          </View>

          {/* CARD 2: Water Saved */}
          <View style={styles.ecoCard}>
            <Image
              source={require('../assets/images/water.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Water Saved</Text>
            <Text style={styles.value}>
              300 <Text style={styles.unit}>L</Text>
            </Text>
            <Text style={styles.description}>Enough for 2 showers.</Text>
          </View>

          {/* CARD 3: Plastic Reduced */}
          <View style={styles.ecoCard}>
            <Image
              source={require('../assets/images/recycle.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Plastic Reduced</Text>
            <Text style={styles.value}>
              12 <Text style={styles.unit}>items</Text>
            </Text>
            <Text style={styles.description}>Less plastic in landfills.</Text>
          </View>

          {/* CARD 4: Energy Saved */}
          <View style={styles.ecoCard}>
            <Image
              source={require('../assets/images/energy.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Energy Saved</Text>
            <Text style={styles.value}>
              20 <Text style={styles.unit}>kWh</Text>
            </Text>
            <Text style={styles.description}>Enough to charge 4 phones.</Text>
          </View>
        </View>

        {/* Eco Progress Container */}

        <View style={styles.ecoContainer}>
          <Text style={styles.heading}>Eco Progress</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.title}>Overall Eco Goal</Text>
              <Text style={styles.percentageText}>
                75% <Text style={styles.unit}>Complete</Text>
              </Text>
            </View>

            <View style={styles.pointsRow}>
              <Text style={styles.value}>750</Text>
              <Text style={styles.unit}>/ 1000 points</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressBarFill, { width: '75%' }]} />
            </View>
          </View>
        </View>

        {/* Badges Container */}
        <Text style={styles.heading}>Badges Earned</Text>
        <View style={styles.grid}>
          <View style={styles.ecoCard}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 8,
                padding: 20,
              }}
            >
              <Image
                source={require('../assets/images/recycle1.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.title}>Recycling Champion</Text>
            </View>
            <Text style={styles.description}>
              Achieved by consistent waste sorting.
            </Text>
          </View>
          <View style={styles.ecoCard}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 8,
                padding: 20,
              }}
            >
              <Image
                source={require('../assets/images/bus.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.title}>Green Commuter</Text>
            </View>
            <Text style={styles.description}>
              For choosing eco-friendly transport.
            </Text>
          </View>
          <View style={styles.ecoCard}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 8,
                padding: 20,
              }}
            >
              <Image
                source={require('../assets/images/shopCart.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.title}>Zero Waste Hero</Text>
            </View>
            <Text style={styles.description}>
              Successfully minimized household waste.
            </Text>
          </View>
          <View style={styles.ecoCard}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 8,
                padding: 20,
              }}
            >
              <Image
                source={require('../assets/images/tree.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.title}>Carbon Saver</Text>
            </View>
            <Text style={styles.description}>
              Reduced your carbon footprint significantly.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 0,
            backgroundColor: '#ced4da',
            width: '100%',
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ced4da',
            marginBottom: 10,
          }}
        />
        <View style={styles.tipsContainer}>
          <Text style={styles.header}>Eco Tips & Challenges</Text>

          <View style={styles.tipsCard}>
            <View style={styles.iconTitleRow}>
              <Ionicons name="sparkles-outline" size={18} color="#ffb703" />
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>
                  Daily Eco Challenge: Reduce Food Waste!
                </Text>
              </View>
            </View>

            <Text style={styles.description1}>
              Did you know that reducing food waste is one of the easiest ways
              to lower your carbon footprint? Aim to plan your meals, store food
              properly, and compost leftovers.
            </Text>

            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() =>
                Linking.openURL(
                  'https://en.wikipedia.org/wiki/Food_loss_and_waste',
                )
              }
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
              <Feather name="arrow-right" size={16} color="#3a86ff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    paddingRight: 190,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ecoCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#EBEBEAFF',
    borderWidth: 1,
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#242524',
  },
  coSub: {
    fontSize: 10,
    lineHeight: 16,
    color: '#242524',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3a86ff',
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8C8D8B',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: '#8C8D8B',
    alignSelf: 'flex-start',
  },
  ecoContainer: {
    padding: 10,
    paddingEnd: 10,
    width: '100%',
    borderWidth: 2,
    borderRadius: 2,
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderBottomColor: '#ced4da',
    borderTopColor: '#ced4da',
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },

  progressTrack: {
    width: '100%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fb8500',
    borderRadius: 6,
    position: 'absolute', // Make sure it starts from left
    left: 0,
    top: 0,
  },

  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fb8500',
  },
  tipsContainer: {
    padding: 16,
    width: '100%',
    marginBottom: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  tipsCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    // gap: 8,
  },
  titleWrapper: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    marginLeft: 8,
  },

  title1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flexWrap: 'wrap',
  },
  description1: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a86ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#3a86ff',
    marginRight: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});

// can you make this code good
