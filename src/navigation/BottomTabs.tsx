import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ARCamera from '../screens/TopDeals';
import EcoWallet from '../screens/EcoWallet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopListStack from './ShopListStack';
import ShopList from '../screens/ShopList';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<ParamListBase, string>;
        navigation: any;
      }): BottomTabNavigationOptions => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          if (route.name === 'Shop List') {
            const iconName = focused
              ? 'clipboard-edit'
              : 'clipboard-edit-outline'; // MaterialCommunityIcons uses the same name regardless of focus
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }

          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Top Deals') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Eco Wallet') {
            iconName = focused ? 'earth' : 'earth-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d81e5b',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop List" component={ShopListStack} />
      <Tab.Screen name="Top Deals" component={ARCamera} />
      <Tab.Screen name="Eco Wallet" component={EcoWallet} />
    </Tab.Navigator>
  );
}
