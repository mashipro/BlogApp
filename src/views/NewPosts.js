import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyle from '../utilities/GlobalStyle';

import EditText from './../components/EditText';
import Button from '../components/Button';
import {postContentFirestore} from '../utilities/PostManager';

const NewPosts = ({route, navigation}) => {
  const TAG = 'NewPost// ';
  const userAuthData = route.params;
  console.log(TAG, 'props data: ', userAuthData);
  const [userCompleteData, setUserCompleteData] = useState({});

  async function getFromAsyncStorage() {
    let userCompleteData = await AsyncStorage.getItem('userData');
    let userParsed = JSON.parse(userCompleteData);
    console.log(TAG, 'data parsed: ', userParsed);
    setUserCompleteData(userParsed);
  }
  // getFromAsyncStorage()
  useEffect(() => {
    getFromAsyncStorage();
  }, []);

  // console.log(userCompleteData);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImageUri, setBlogImageUri] = useState('');

  function handleSubmitPosts() {
    let payload = {
      postTitle: blogTitle,
      postContent: blogContent,
      postImageURI: blogImageUri,
    };
    if (blogTitle && blogContent && blogImageUri) {
      postContentFirestore(userCompleteData, payload);
    } else {
      console.log(TAG, 'incomplete field');
    }
  }

  function handleCancel() {
    setBlogTitle('');
    setBlogContent('');
    setBlogImageUri('');
    // postContentFirestore(userCompleteData);
  }

  //UNSPLASH: https://source.unsplash.com/random/800x800

  return (
    <View style={GlobalStyle.backgroundContainer}>
      <View>
        <Text style={GlobalStyle.textHeroTitle}>NEWPOST+</Text>
        <View>
          <EditText
            title={'Post Title'}
            value={blogTitle}
            onChangeText={t => setBlogTitle(t)}
          />
          <EditText
            title={'Post Content'}
            value={blogContent}
            // height={100}
            onChangeText={t => setBlogContent(t)}
            isScrollable
            lines={5}
            linesMax={3}
            align={'top'}
          />
          <EditText
            title={'Post Image URI'}
            value={blogImageUri}
            onChangeText={t => setBlogImageUri(t)}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flex: 0.5, marginRight: 16}}>
          <Button
            text={'Reset'}
            onPress={() => handleCancel()}
            color={'grey'}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            text={'Submit Post'}
            onPress={() => handleSubmitPosts()}
            color={'gold'}
          />
        </View>
      </View>
    </View>
  );
};

export default NewPosts;

const styles = StyleSheet.create({});
