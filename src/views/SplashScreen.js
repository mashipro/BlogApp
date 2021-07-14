import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SplashScreen = ({navigation}) => {
  let screenHoldTimemilis = 3000;
  setTimeout(function () {
    navigation.replace('Dashboard');
    // navigation.replace('Dashboard');
  }, screenHoldTimemilis);
  return (
    <View>
      <Text>HUEHUEHUE BLOG APPS</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
