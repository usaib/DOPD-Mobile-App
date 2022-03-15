import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {animation: 'fadeInUp'};
  }
  render() {
    return (
      <View style={{alignItems: 'flex-start', marginTop: 85, marginLeft: 170}}>
        <Animatable.View
          animation={this.state.animation}
          onAnimationEnd={() => {
            console.log('end');
            this.setState({
              animation: 'flash',
            });
          }}
          iterationCount={1}
          direction="alternate">
          <Icon size={50} name="touch-app" color={'#3498DB'} />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#FFFFFF',
  },
});
