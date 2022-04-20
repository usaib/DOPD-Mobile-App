import React from 'react';
import {View, StyleSheet} from 'react-native';

export const HistoryCard = ({minHeight, width, children, style}) => {
  return (
    <View
      style={[
        cardStyle.card,
        {
          minHeight: minHeight,
          width: width,
          backgroundColor: '#fff',
          ...style,
        },
      ]}>
      {children}
    </View>
  );
};

const cardStyle = StyleSheet.create({
  card: {
    position: 'relative',
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
