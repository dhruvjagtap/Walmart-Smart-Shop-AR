// ShopListStack.tsx
import { createStackNavigator } from '@react-navigation/stack';
import ShopList from '../screens/ShopList';
import MockARScreen from '../screens/MockARScreen';
import ARScreen from '../screens/WebAR';

const Stack = createStackNavigator();

export default function ShopListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopListMain" component={ShopList} />
      <Stack.Screen name="WebAR" component={ARScreen} />
    </Stack.Navigator>
  );
}
