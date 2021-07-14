import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GlobalStyle from '../utilities/GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';

const CircleIconButton = ({
  iconName = 'home',
  iconSize = 40,
  iconColor = 'black',
  color = null,
  borderColor = null,
  isBordered = false,
  expandButton = 0,
  position = null,
  onPress = () => {
    console.log('Please override onPress Circle Button Components');
  },
}) => {
  let Sizing = iconSize + expandButton + 10;
  return (
    <View style={[GlobalStyle.buttonContainer]}>
      <TouchableOpacity
        style={[
          GlobalStyle.buttonTouchable,
          {backgroundColor: color, borderColor: borderColor},
          isBordered ? {borderWidth: 7} : null,
          {
            width: Sizing,
            height: Sizing,
            borderRadius: 100,
            position: position,
          },
        ]}
        onPress={() => onPress()}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CircleIconButton;

const styles = StyleSheet.create({});
