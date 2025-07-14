import { View, Image, Text } from 'react-native';
import TopBar from '../components/TopBar';
import auth from '@react-native-firebase/auth';

const user = auth().currentUser;

export default function Profile() {
  const user = auth().currentUser;
  const profileImage =
    user?.photoURL || require('../assets/images/profile.jpg');
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <TopBar showGreeting={false} title="Profile" />
      <View>
        <Image source={profileImage} />
        <Text>{user?.displayName}</Text>
      </View>
    </View>
  );
}
