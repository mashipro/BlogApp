import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import GlobalStyle from '../utilities/GlobalStyle';
import BlogPostHero from '../components/BlogPostHero';
import {getUserData, setUserDataFirestore} from '../utilities/UserManager';
import EditText from '../components/EditText';
import Button from './../components/Button';
import {getUserNameByUID} from './../utilities/UserManager';

const Dashboard = ({route, navigation}) => {
  const TAG = 'Dashboard// ';
  // console.log(TAG, 'props data: ', route);
  const userAuthData = route.params;

  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userData, setUserData] = useState('');
  const [latestBlogPost, setLatestBlogPost] = useState([]);
  const [popularBlogPost, setPopularBlogPost] = useState([]);

  const [userName, setUserName] = useState('');
  const [userAvatarURI, setUserAvatarURI] = useState('');
  const [userAtName, setUserAtName] = useState('');

  // console.log(TAG, 'userAuthData', userAuthData);

  function getUserData(userUID) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('UserData')
        .doc(userUID)
        .onSnapshot(documentSnapshot => {
          // console.log(TAG, 'User data from db: ', documentSnapshot.data());
          // console.log(TAG, 'Raws data from db: ', documentSnapshot);
          !documentSnapshot.exists
            ? setIsNewUser(true)
            : (setIsNewUser(false),
              setUserData(documentSnapshot.data()),
              AsyncStorage.setItem(
                'userData',
                JSON.stringify(documentSnapshot.data()),
                setLoading(false),
              ));
        });

      // Stop listening for updates when no longer required
      return () => {
        subscriber();
        console.log(subscriber());
      };
    }, []);
    useEffect(() => {
      const subscriber = firestore()
        .collection('BlogData')
        .doc('BlogPost')
        .collection('BlogPostData')
        .orderBy('postCreated', 'desc')
        .limit(10)
        .onSnapshot(docs => {
          // console.log(TAG, 'document: ', docs);
          let newPostArray = [];
          docs.forEach(async documentSnapshot => {
            // console.log(TAG, 'document: ', documentSnapshot.data());
            let blogPostData = documentSnapshot.data();
            blogPostData.postID = documentSnapshot.id;
            newPostArray.push(blogPostData);
          });
          setLatestBlogPost(newPostArray);
          // setLoading(false);
        });
      return () => {
        subscriber();
      };
    }, []);
    useEffect(() => {
      const subscriber = firestore()
        .collection('BlogData')
        .doc('BlogPost')
        .collection('BlogPostData')
        .orderBy('postViews', 'desc')
        .limit(20)
        .onSnapshot(docs => {
          // console.log(TAG, 'document: ', docs);
          let newPostArray = [];
          docs.forEach(async documentSnapshot => {
            // console.log(TAG, 'document: ', documentSnapshot.data());
            let blogPostData = documentSnapshot.data();
            blogPostData.postID = documentSnapshot.id;
            newPostArray.push(blogPostData);
          });
          setPopularBlogPost(newPostArray);
          // setLoading(false);
        });
      return () => {
        subscriber();
      };
    }, []);
  }

  function handleSubmit() {
    if (userName && userAvatarURI && userAtName) {
      let userDataToBeUploaded = {
        userName: userName,
        userAvatar: userAvatarURI,
        userUID: userAuthData.uid,
        userEmail: userAuthData.email,
        userAtName: userAtName.replace(/\s+/g, '').toLowerCase(),
      };
      try {
        setUserDataFirestore(userDataToBeUploaded).then(res => {
          console.log(TAG, 'success: ', res);
        });
      } catch (e) {
        console.log(TAG, 'error: ', e);
      }
    } else {
      console.log(TAG, 'submit error field incomplete');
    }
  }

  getUserData(userAuthData.uid);
  // setUserData(getUserData(userAuthData.uid))
  console.log(TAG, 'is new user: ', isNewUser);
  console.log(TAG, 'latest Blogpost: ', latestBlogPost);
  console.log(TAG, 'popular Blogpost: ', popularBlogPost);
  if (isNewUser) {
    return (
      <View style={GlobalStyle.backgroundContainerCentered}>
        <View>
          <EditText
            title={'Full Name'}
            value={userName}
            onChangeText={t => setUserName(t)}
            // isTitled={false}
          />
          <EditText
            title={'Avatar URI'}
            value={userAvatarURI}
            onChangeText={t => setUserAvatarURI(t)}
            // isTitled={false}
            // isSecured={true}
          />
          <EditText
            title={'@name'}
            value={userAtName}
            onChangeText={t => setUserAtName(t)}
            // isTitled={false}
            // isSecured={true}
          />
          <Button text={'Submit'} onPress={() => handleSubmit()} />
          {/* <Button
            text={'or Register'}
            onPress={() => handleGoToRegister()}
            color={null}
          /> */}
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>Loading boss!!</Text>
      </View>
    );
  }
  return (
    <View style={GlobalStyle.backgroundContainerCentered}>
      {/* ROOT CONTAINER //////////////////////////////////*/}
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={GlobalStyle.textHeroTitle}>DISCOVER//</Text>
          <Text style={GlobalStyle.textLargeSubTitle}>WHAT'S NEW TODAY</Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={[styles.blogpostHeroContainer,{flexDirection: 'row',}]}>
            {latestBlogPost.map((e, i) => (
              <View key={i}>
                <BlogPostHero
                  title={e.postTitle}
                  author={e.creatorName}
                  atName={e.creatorAtName}
                  bg={e.postImageURI}
                  ava={e.creatorAvatarURI}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.headerContainer}>
          <Text style={GlobalStyle.textLargeSubTitle}>Popular Posts OwO</Text>
        </View>
        <View>
          {popularBlogPost.map((e, i) => (
            <View key={i}>
              <BlogPostHero
                title={e.postTitle}
                author={e.creatorName}
                atName={e.creatorAtName}
                bg={e.postImageURI}
                ava={e.creatorAvatarURI}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  headerContainer: {
    margin: 16,
  },
  blogpostHeroContainer: {},
});
