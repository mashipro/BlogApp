import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import GlobalStyle from '../utilities/GlobalStyle';

import AvatarCircleImage from './AvatarCircleImage';
import Button from '../components/Button';
import CircleIconButton from './CircleIconButton';

const UserCard = ({
  isStatAvailable = false,
  statData = {follower: 0, views: 0, subscriber: 0},
  isMyProfile = false,
  name = 'Blank',
  email = 'blank@blank.blank',
  image,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        padding: 10,
      }}>
      <AvatarCircleImage size={100} image={image} />
      <Text style={GlobalStyle.avatarTextTitle}>{name}</Text>
      <Text style={GlobalStyle.avatarTextSubTitle}>{email}</Text>
      {!isStatAvailable ? null : (
        <View style={GlobalStyle.avatarStatsContainer}>
          <View style={GlobalStyle.avatarStatsItemContainer}>
            <Text style={GlobalStyle.avatarTextTitleHero}>30</Text>
            <Text style={GlobalStyle.avatarTextSubTitleHero}>Subs</Text>
          </View>
          <View style={GlobalStyle.avatarStatsItemContainer}>
            <Text style={GlobalStyle.avatarTextTitleHero}>30</Text>
            <Text style={GlobalStyle.avatarTextSubTitleHero}>Views</Text>
          </View>
          <View style={GlobalStyle.avatarStatsItemContainer}>
            <Text style={GlobalStyle.avatarTextTitleHero}>30</Text>
            <Text style={GlobalStyle.avatarTextSubTitleHero}>Rank</Text>
          </View>
        </View>
      )}

      {isMyProfile ? null : (
        <Button
          text={'Subscribe'}
          // onPress={() => handleGoToRegister()}
          color={'gold'}
        />
      )}
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({});
