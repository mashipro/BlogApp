import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../utilities/GlobalStyle';

const AvatarCircleImage = ({size = 60, image}) => {
  let photoUri = {uri: image};
  return (
    <View>
      <Image
        source={photoUri}
        style={[GlobalStyle.avatarCircleImage, {height: size, width: size,borderWidth:1,borderColor:'grey'}]}
      />
      {/* <Image
        style={{
          width: size,
          height: size,
          backgroundColor: 'white',
          borderRadius: 200,
        }}
        source={photoUri}
      /> */}
    </View>
  );
};

export default AvatarCircleImage;

const styles = StyleSheet.create({});
