import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';

export const ErrorSnackbar = ({error, message, setError}) => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setError(false);

  return (
    <View style={styles.container}>
      {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
      <Snackbar
        visible={error}
        onDismiss={onDismissSnackBar}
        duration={1500}
        style={{backgroundColor: '#EE4B2B', display: 'flex'}}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 80,
  },
});
