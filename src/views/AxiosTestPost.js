import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import EditText from './../components/EditText';
import Button from '../components/Button';
import GlobalStyle from '../utilities/GlobalStyle';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

const AxiosTestPost = ({route, navigation}) => {
  console.log(route);
  const TAG = 'AxiosTestPost// ';

  const isFocused = useIsFocused();

  var uriGett = 'http://10.0.2.2:3000/posts/';

  const [postData, setpostData] = useState([]);

  let getDataAx = async () => {
    try {
      await axios.get(uriGett).then(response => {
        //   console.log(response.data)
        setpostData(response.data);
      });
    } catch (e) {
      console.log(TAG, ' error: ', e);
    }
  };

  function handleSubmitPosts() {
    navigation.navigate('AxiosTest');
  }

  function handleItemPress(item, index) {
    navigation.navigate('AxiosTestPostDetails', {item, index});
  }

  useEffect(() => {
    getDataAx();
  }, [isFocused]);

  console.log(TAG, 'post data: ', postData);
  return (
    <View style={{padding: 16}}>
      <ScrollView>
        <Button
          text={'Add Post'}
          onPress={() => handleSubmitPosts()}
          color={'grey'}
        />
        <View>
          {postData.length > 0 && (
            <View>
              {postData.map((e, i) => (
                <View
                  key={i}
                  style={[
                    GlobalStyle.backgroundContainer,
                    {marginVertical: 5},
                  ]}>
                  <TouchableOpacity onPress={() => handleItemPress(e, i)}>
                    <Text>{e.title}</Text>
                    <Text>{e.description}</Text>
                    <Text>{e.content}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AxiosTestPost;

const styles = StyleSheet.create({});
