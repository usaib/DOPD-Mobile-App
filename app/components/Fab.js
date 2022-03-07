import * as React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal} from 'react-native-paper';

export const FloatingButton = ({onDone, onRotate}) => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={open ? 'format-list-checkbox' : 'plus'}
        actions={[
          {
            icon: 'rotate-3d',
            label: 'Rotate Body',
            color: '#3498DB',
            onPress: () => {
              onRotate();
            },
            labelTextColor: '#3498DB',
          },
          {
            icon: 'check-all',
            label: 'Done',
            color: '#3498DB',
            labelTextColor: '#3498DB',

            onPress: () => {
              onDone();
            },
            small: false,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
          }
        }}
        style={styles.fab}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fab: {
    color: '#FFFFFF',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  },
});
