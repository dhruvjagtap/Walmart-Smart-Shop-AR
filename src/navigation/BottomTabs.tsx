import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShopList from '../screens/ShopList';
import ARCamera from '../screens/ARCamera';
import EcoWallet from '../screens/EcoWallet';

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
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ShopList') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'ARCamera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'EcoWallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fb8500',
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
      <Tab.Screen name="ShopList" component={ShopList} />
      <Tab.Screen name="ARCamera" component={ARCamera} />
      <Tab.Screen name="EcoWallet" component={EcoWallet} />
    </Tab.Navigator>
  );
}
