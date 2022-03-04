import React from 'react';
import {Appbar} from 'react-native-paper';
import {Platform, StyleSheet} from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

function AppBarWrapper({onPress, onMenuPress}) {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action color="#3498DB" icon="menu" onPress={onMenuPress} />
      <Appbar.Content
        title="Home"
        subtitleStyle={{
          fontFamily: 'Gibson-Regular',
        }}
        color="#3498DB"
        subtitle={'Digital OPD'}
      />
      <Appbar.Action color="#3498DB" icon="logout" onPress={onPress} />
    </Appbar.Header>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',

    fontFamily: 'Gibson-Regular',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
    backgroundColor: '#3498DB',
  },
  loginView: {
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
export default AppBarWrapper;