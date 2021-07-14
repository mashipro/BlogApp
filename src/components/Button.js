import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GlobalStyle from '../utilities/GlobalStyle';

const Button = ({
  text,
  color = 'black',
  textColor = 'white',
  isBordered = false,
  borderColor = 'black',
  onPress = () => {
    console.log('Please override onPress Button Components');
  },
}) => {
  let colorOption = color == null ? 'black' : textColor;
  return (
    <View style={GlobalStyle.buttonContainer}>
      <TouchableOpacity
        style={[
          GlobalStyle.buttonTouchable,
          {backgroundColor: color, borderColor: borderColor},
          isBordered ? {borderWidth: 7} : null,
        ]}
        onPress={() => onPress()}>
        <Text
          style={[
            GlobalStyle.buttonTouchableText,
            {color: colorOption, borderRadius: 7},
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
