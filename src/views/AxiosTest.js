import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import EditText from './../components/EditText';
import Button from '../components/Button';
import GlobalStyle from '../utilities/GlobalStyle';
import axios from 'axios';

const AxiosTest = ({navigation}) => {
  const TAG = 'AxiosTest// ';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');

  var uriGett = 'http://10.0.2.2:3000/posts/';

  let postDataAx = async payload => {
    try {
      await axios
        .post(uriGett, payload)
        .then(res => console.log('success post data', res));
    } catch (e) {
      console.log(TAG, ' error: ', e);
    }
  };

  let patchDataAx = async (dataID, data) => {
    try {
      await axios.patch(uriGett + dataID, data).then(res => console.log(res));
    } catch (e) {
      console.log(TAG, ' error: ', e);
    }
  };

  function handleSubmitPosts() {
    if (title && description && content) {
      var payload = {
        title: title,
        description: description,
        content: content,
      };
      postDataAx(payload);
      setTitle('');
      setDescription('');
      setContent('');
      navigation.goBack();
    } else {
      console.log(TAG, 'error, some field are empty');
    }
  }

  return (
    <View style={GlobalStyle.backgroundContainerCentered}>
      <View>
        <EditText
          title={'Blog Title'}
          value={title}
          onChangeText={t => setTitle(t)}
        />
        <EditText
          title={'Blog Content'}
          value={content}
          onChangeText={t => setContent(t)}
        />
        <EditText
          title={'Description'}
          value={description}
          onChangeText={t => setDescription(t)}
        />
        <Button
          text={'Submit Post'}
          onPress={() => handleSubmitPosts()}
          color={'gold'}
        />
      </View>
    </View>
  );
};

export default AxiosTest;

const styles = StyleSheet.create({});
