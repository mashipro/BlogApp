import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import GS from '../utilities/GlobalStyle';

import EditText from '../components/EditText';
import Button from '../components/Button';
import CircleButton from '../components/CircleIconButton';
import {registerUserByEmail} from '../utilities/UserManager';

const SignUp = ({navigation}) => {
  const TAG = 'Sign Up// ';
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function handleRegister() {
    console.log(TAG, 'button login is hit!');
    console.log(
      TAG,
      'data to register: userEmail: ',
      userEmail,
      ' userPassword: ',
      userPassword,
    );
    try {
      registerUserByEmail(userEmail, userPassword);
    } catch (e) {
      console.log(TAG, 'error: ', e);
    }
  }
  function handleBackButton() {
    console.log(TAG, 'back button is hit!');
    navigation.goBack();
  }

  return (
    <View style={GS.backgroundContainer}>
      <CircleButton
        iconName={'chevron-back'}
        position={'absolute'}
        onPress={() => handleBackButton()}
      />
      <View style={GS.backgroundContainerInset}>
        <Text style={GS.textHeroTitle}>Register</Text>
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
        <Button text={'Sign Up'} onPress={() => handleRegister()} />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
