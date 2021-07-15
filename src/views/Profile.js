import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';
import GlobalStyle from '../utilities/GlobalStyle';
import {logoutUser} from '../utilities/UserManager';
import UserCard from './../components/UserCard';

const Profile = ({navigation}) => {
  const TAG = 'Profile// ';

  function handleLogout() {
    logoutUser();
  }

  function handleAxi() {
    navigation.push('AxiosTestPost');
  }
  const [userCompleteData, setUserCompleteData] = useState({});

  async function getFromAsyncStorage() {
    let userCompleteData = await AsyncStorage.getItem('userData');
    let userParsed = JSON.parse(userCompleteData);
    console.log(TAG, 'data parsed: ', userParsed);
    setUserCompleteData(userParsed);
  }

  useEffect(() => {
    getFromAsyncStorage();
  }, []);
  return (
    <View style={GlobalStyle.backgroundContainer}>
      <View
        style={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text style={GlobalStyle.textHeroTitle}>IDENTITY#</Text>
        </View>
        <View style={{height: '70%'}}>
          <UserCard
            name={userCompleteData.userName}
            email={userCompleteData.userEmail}
            image={userCompleteData.userAvatar}
          />
        </View>
        <View>
        <Button
            text={'Go to axiTestMode'}
            onPress={() => handleAxi()}
            color={'grey'}
          />
          <Button
            text={'Log me Out!'}
            onPress={() => handleLogout()}
            color={'grey'}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
