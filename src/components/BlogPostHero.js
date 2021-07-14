import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../utilities/GlobalStyle';
import {getUserByUID} from '../utilities/UserManager';
import AvatarCircleImage from './AvatarCircleImage';

const BlogPostHero = ({title, author, atName, bg, ava}) => {
  let imageUri = {uri: bg};
  
  return (
    <View style={GlobalStyle.blogpostHeroContainer}>
      <ImageBackground style={GlobalStyle.blogpostHeroImage} source={imageUri}>
        <View style={GlobalStyle.blogpostTextContainer}>
          <Text style={GlobalStyle.blogpostTextTitle}>{title}</Text>
          <View style={GlobalStyle.blogpostSubTextContainer}>
            <AvatarCircleImage image={ava}/>
            <View>
              <Text style={GlobalStyle.blogpostTextSubTitle}>{author}</Text>
              <Text style={GlobalStyle.blogpostTextLink}>@{atName}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BlogPostHero;

const styles = StyleSheet.create({});
