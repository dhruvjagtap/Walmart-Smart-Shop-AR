import { Text } from 'react-native';
import { View } from 'react-native';

export default function ARCamera() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fb8500', fontWeight: '600', fontSize: 32 }}>
        Welcome to AR Camera
      </Text>
    </View>
  );
}
