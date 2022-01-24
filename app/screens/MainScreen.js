import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useUserDispatch} from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBarWrapper from '../components/AppBar';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

function MainScreen({navigation}) {
  const userDispatch = useUserDispatch();
  const [rippleOverflow, setRippleOverflow] = useState(false);
  const removeValue = async value => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      console.log('Error in removing', e);
    }

    console.log('Done.');
  };
  const toggle = () => {
    navigation?.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <AppBarWrapper
        onPress={async () => {
          userDispatch({type: 'LOGOUT'});
          await removeValue('isAuthenticated');
        }}
        onMenuPress={toggle}
      />
      <View style={styles.cardView}>
        <TouchableNativeFeedback
          onPress={() => {
            setRippleOverflow(!rippleOverflow);
          }}
          background={TouchableNativeFeedback.Ripple(
            '#D3D3D3',
            rippleOverflow,
          )}>
          <Card>
            <Card.Content>
              <Title
                style={{
                  fontFamily: 'Gibson-Regular',
                }}>
                Go Smart
              </Title>
              <Paragraph>
                Check your symptoms and find out what could be causing them by
                Artificial Intelligence
              </Paragraph>
            </Card.Content>
            <Card.Cover />
          </Card>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.cardView}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.9 : 1,
            },
            styles.wrapperCustom,
          ]}>
          <Card>
            <Card.Content>
              <Title
                style={{
                  fontFamily: 'Gibson-Regular',
                }}>
                Book an Appointment
              </Title>
              <Paragraph>
                Book in-person or online video appointments with the best
                Doctors and Specialists.
              </Paragraph>
            </Card.Content>
            <Card.Cover />
          </Card>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498DB',
    flexDirection: 'column',
  },
  cardView: {
    flex: 1,
    margin: 10,
  },
  Text: {
    marginLeft: 10,
    color: '#3498DB',
    fontFamily: 'Gibson-Regular',
    fontSize: 20,
  },
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
  },
});
export default MainScreen;
