import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import GS from '../utilities/GlobalStyle';

import EditText from '../components/EditText';
import Button from '../components/Button';
import {loginUserByEmail} from '../utilities/UserManager';

const SignIn = ({navigation}) => {
  const TAG = 'Sign In// ';
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function handleLogin() {
    console.log(TAG, 'button login is hit!');
    console.log(
      TAG,
      'data to login: userEmail: ',
      userEmail,
      ' userPassword: ',
      userPassword,
    );
    try {
      loginUserByEmail(userEmail, userPassword);
    } catch (e) {
      console.log(TAG, 'error: ', e);
    }
  }
  function handleGoToRegister() {
    console.log(TAG, 'button register is hit!');
    navigation.navigate('Sign Up');
  }

  return (
    <View style={GS.backgroundContainerCentered}>
      <Text style={GS.textHeroTitle}>Login</Text>
      <EditText
        title={'Email'}
        value={userEmail}
        onChangeText={t => setUserEmail(t)}
        isTitled={false}
      />
      <EditText
        title={'Password'}
        value={userPassword}
        onChangeText={t => setUserPassword(t)}
        isTitled={false}
        isSecured={true}
      />
      <Button text={'Sign In'} onPress={() => handleLogin()} />
      <Button
        text={'or Register'}
        onPress={() => handleGoToRegister()}
        color={null}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
