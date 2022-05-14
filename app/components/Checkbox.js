import React, {useState} from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
export const Checkbox = ({title, onPress, status}) => {
  const [checked, setChecked] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
      }}>
      <Text style={[globalStyles.cardsubHeading, {fontSize: 18}]}>{title}</Text>
      {status && (
        <Image
          source={require('../images/checked.png')}
          style={{height: 28, width: 28}}
        />
      )}
      {!status && (
        <Image
          source={require('../images/unchecked.png')}
          style={{height: 28, width: 28}}
        />
      )}
    </TouchableOpacity>
  );
};
