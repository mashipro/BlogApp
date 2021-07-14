import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const TAG = 'UserManager// ';
function validateEmail(mail) {
  let isValid = mail.includes('@gmail.com');
  console.log('mail is valid = ', isValid);
  return isValid ? mail : mail + 'gmail.com';
}

export async function registerUserByEmail(mail, pass) {
  let emails = validateEmail(mail);
  console.log(emails, pass);
  auth()
    .createUserWithEmailAndPassword(emails, pass)
    .then(res => {
      let user = res.user;
      console.log('User account created with email: ', user.email);
      return user;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

export async function loginUserByEmail(mail, pass) {
  let emails = validateEmail(mail);
  console.log(emails, pass);
  auth()
    .signInWithEmailAndPassword(emails, pass)
    .then(res => {
      // console.log(res);
      let userData = res.user;

      console.log('signed in! with email: ' + userData.email);
      return userData;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      if (error.code === 'auth/user-not-found') {
        console.log('That email address is not registered');
      }

      console.error(error);
    });
}

export async function logoutUser() {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export async function setUserDataFirestore(userData) {
  console.log('user data to be stored: ', userData);
  await firestore()
    .collection('UserData')
    .doc(userData.userUID)
    .set(userData)
    .then(() => {
      console.log('user data is uploaded');
      return true;
    });
}

export async function getUserByUID(UID) {
  await firestore()
    .collection('UserData')
    .doc(UID)
    .get()
    .then(res => {
      return res.data();
    });
}
