import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

import GlobalStyle from '../utilities/GlobalStyle';

import EditText from './../components/EditText';
import Button from '../components/Button';
import {postContentFirestore} from '../utilities/PostManager';

import storage from '@react-native-firebase/storage';

const NewPosts = ({route, navigation}) => {
  const TAG = 'NewPost// ';
  const userAuthData = route.params;
  // console.log(TAG, 'props data: ', userAuthData);

  const [userCompleteData, setUserCompleteData] = useState({});

  async function getFromAsyncStorage() {
    let userCompleteData = await AsyncStorage.getItem('userData');
    let userParsed = JSON.parse(userCompleteData);
    // console.log(TAG, 'data parsed: ', userParsed);
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

  const [blogImage, setBlogImage] = useState();
  const [newID, setNewID] = useState('');

  function handleSubmitPosts() {
    if (blogTitle && blogContent) {
      if (blogImage) {
        const moments = blogTitle.toLowerCase().replace(/\s+/g, '');
        setBlogImageUri(moments);
        const reference = storage().ref('BlogData/BlogPost/').child(moments);
        const task = reference.putFile(blogImage);
        task.on('state_changed', taskSnapshot => {
          console.log(
            TAG,
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
        task.then(res => {
          // console.log(TAG, 'Image uploaded to the bucket!');
          // console.log(TAG, 'image upload meta: ', res.metadata);
          console.log(
            TAG,
            'image upload meta fullpath: ',
            res.metadata.fullPath,
          );
          let payload = {
            postTitle: blogTitle,
            postContent: blogContent,
            postImageURI: res.metadata.fullPath,
          };
          postContentFirestore(userCompleteData, payload);
          setBlogTitle('');
          setBlogContent('');
          setBlogImage('');
          navigation.goBack();
        });
      } else {
        console.log(TAG, 'add image first');
      }
    } else {
      console.log(TAG, 'incomplete field');
    }
  }

  function handleSubmit() {}

  function handleCancel() {
    // setBlogTitle('');
    // setBlogContent('');
    // setBlogImageUri('');

    launchImageLibrary(
      {
        maxHeight: 600,
        maxWidth: 600,
        mediaType: 'photo',
      },
      res => {
        setBlogImage(res.assets[0].uri);
        // setNewID(Moment.now())
        // console.log(TAG, res.assets[0].uri);
      },
    );
    // console.log(TAG,'selected image data : ',imagesSelect);
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
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flex: 0.5, marginRight: 16}}>
          <Button
            text={'Image'}
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
