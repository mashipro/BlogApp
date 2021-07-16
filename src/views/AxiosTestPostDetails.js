import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EditText from '../components/EditText';
import GlobalStyle from '../utilities/GlobalStyle';
import Button from './../components/Button';

const AxiosTestPostDetails = ({route, navigation}) => {
  const TAG = 'AxiosTestPostDetails// ';

  const itemIndex = route.params.index;
  const itemDetails = route.params.item;
  //   console.log(TAG, 'index: ', itemIndex);
  //   console.log(TAG, 'items: ', itemDetails);

  const [title, setTitle] = useState(itemDetails.title);
  const [description, setDescription] = useState(itemDetails.description);
  const [content, setContent] = useState(itemDetails.content);

  const urlData = 'http://10.0.2.2:3000/posts/';

  let deleteDataAx = async () => {
    try {
      await axios
        .delete(`${urlData}/${itemDetails.id}`)
        .then(() => navigation.goBack());
    } catch (e) {
      console.log(TAG, ' error: ', e);
    }
  };

  let putDataAx = async data => {
    try {
      await axios.put(`${urlData}/${itemDetails.id}`, data).then(() => {
        navigation.goBack();
      });
    } catch (e) {
      console.log(TAG, ' error: ', e);
    }
  };

  function handleDelete() {
    deleteDataAx();
  }
  function handleUpdate() {
    payload = {
      title: title,
      description: description,
      content: content,
    };
    putDataAx(payload);
  }

  return (
    <View style={[GlobalStyle.backgroundContainer]}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          elevation: 10,
        }}>
        <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
          <Text>{itemDetails.title}</Text>
          <Text>{itemDetails.description}</Text>
          <Text>{itemDetails.content}</Text>
          <EditText
            title={'Blog Title'}
            value={title}
            onChangeText={t => setTitle(t)}
          />
          <EditText
            title={'Blog Description'}
            value={description}
            onChangeText={t => setDescription(t)}
          />
          <EditText
            title={'Blog Content'}
            value={content}
            onChangeText={t => setContent(t)}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={{marginHorizontal: 5}}>
            <Button
              text={'Delete'}
              onPress={() => handleDelete()}
              color={'tomato'}
            />
          </View>
          <View style={{marginHorizontal: 5}}>
            <Button
              text={'Update'}
              onPress={() => handleUpdate()}
              color={'skyblue'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AxiosTestPostDetails;

const styles = StyleSheet.create({});
