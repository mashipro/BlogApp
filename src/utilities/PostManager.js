const TAG = 'Post Manager// ';
import firestore from '@react-native-firebase/firestore';

export async function postContentFirestore(userData, prePayload) {
  // console.log(TAG,'user data payload: ',userData);
  let payload = {
    postTitle: prePayload.postTitle,
    postContent: prePayload.postContent,
    postImageURI: prePayload.postImageURI,
    creatorName: userData.userName,
    creatorAvatarURI: userData.userAvatar,
    creatorAtName: userData.userAtName,
    creatorUID: userData.userUID,

    postCreated: firestore.FieldValue.serverTimestamp(),
    postViews: 0,
    postUpVote: 0,
  };
  await firestore()
    .collection('BlogData')
    .doc('BlogPost')
    .collection('BlogPostData')
    .add(payload)
    .then(res => {
      console.log(TAG, 'Content added with id => ', res.id);
      console.log(TAG, 'Content added! => ', res);
      console.log(TAG, 'Content added! => ', res);
      postContentAuthorFirestore(payload, res.id);
    });
}

async function postContentAuthorFirestore(prePayload, id) {
  let payload = {
    postId: id,
    postTitle: prePayload.postTitle,
    postImageURI: prePayload.postImageURI,
    postCreated: prePayload.postCreated,
  };
  await firestore()
    .collection('UserData')
    .doc(prePayload.creatorUID)
    .collection('BlogPostData')
    .doc(id)
    .set(payload)
    .then(res => {
      console.log(TAG, 'User Content added! => ', res);
    });
}
