import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import '../utilities/GlobalStyle';
import GlobalStyle from '../utilities/GlobalStyle';

const EditText = ({
  title,
  placeholder,
  value,
  onChangeText,
  isTitled = true,
  isSecured = false,
  isPlaceholderDisabled = false,
  isScrollable = false,
  lines = 1,
  linesMax = lines,
  align = 'center',
}) => {
  var isValid = true;
  let placeholderOption = isPlaceholderDisabled
    ? null
    : placeholder != null
    ? placeholder
    : title != null
    ? title
    : null;
  return (
    <View style={GlobalStyle.editTextContainer}>
      {isTitled ? (
        <Text style={GlobalStyle.editTextTitle}>{title}:</Text>
      ) : null}
      <View style={GlobalStyle.editTextTextInputContainer}>
        <TextInput
          style={[
            GlobalStyle.editTextTextInput,
            {maxHeight: linesMax * 60, width: '100%', textAlignVertical:align},
          ]}
          placeholder={placeholderOption}
          value={value}
          onChangeText={txt => onChangeText(txt)}
          secureTextEntry={isSecured}
          scrollEnabled={isScrollable}
          numberOfLines={lines}
          multiline={isScrollable}
        />
      </View>
    </View>
  );
};

export default EditText;

const styles = StyleSheet.create({});
