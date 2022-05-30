import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    flexDirection: 'column',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  sectionHeading: {
    fontSize: 25,
    fontWeight: '800',
    color: '#2a3d53',
    lineHeight: 30,
    fontFamily: 'Roboto-Bold',
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2a3d53',
    fontFamily: 'Roboto-Medium',
  },
  cardsubHeading: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    color: '#2a3d53',
  },
});
