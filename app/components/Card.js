import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const CustomCard = props => {
  const [rippleOverflow, setRippleOverflow] = React.useState(false);

  return (
    <TouchableNativeFeedback
      onPress={() => {
        setRippleOverflow(!rippleOverflow);
        props.onPress();
      }}
      background={TouchableNativeFeedback.Ripple('#D3D3D3', false)}>
      <View
        style={[
          cardStyle.card,
          {
            height: props.height,
            width: props.width,
            backgroundColor: props.backColor,
          },
        ]}>
        <View
          style={[
            cardStyle.cardCircle,
            {
              backgroundColor: props.cirBackCol,
              bottom: props.bottom,
              right: props.right,
            },
          ]}></View>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  );
};
export default CustomCard;

const cardStyle = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 6,
    marginVertical: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardCircle: {
    backgroundColor: '',
    position: 'absolute',
    height: 140,
    width: 140,
    borderTopLeftRadius: 70,
  },
});
