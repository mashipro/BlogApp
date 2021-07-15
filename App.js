import 'react-native-gesture-handler';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

//React Navigator
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//Import Firebase
import auth from '@react-native-firebase/auth';

//ImportView
import SignIn from './src/views/SignIn';
import SignUp from './src/views/SignUp';
import Dashboard from './src/views/Dashboard';
import NewPosts from './src/views/NewPosts';
import Options from './src/views/Options';
import SplashScreen from './src/views/SplashScreen';
import Profile from './src/views/Profile';

import Icon from 'react-native-vector-icons/Ionicons';
import AxiosTest from './src/views/AxiosTest';
import AxiosTestPost from './src/views/AxiosTestPost';

//ROUTING NAVIGATION ///////////////////////////////////////////////////////////////////////////
const App = () => {
  const TAG = 'App// ';
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  function dashboardRoute() {
    // console.log(TAG, 'user data: ', user);

    return (
      <>
        <Tabs.Navigator
          initialRouteName="Dashboard"
          tabBarOptions={{
            labelStyle: {fontSize: 14},
            activeTintColor: 'black',
            activeBackgroundColor: 'gold',
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let icons;
              if (route.name == 'Dashboard') {
                icons = focused ? 'apps' : 'apps-outline';
              } else if (route.name == 'New Posts') {
                icons = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name == 'Profile') {
                icons = focused ? 'person' : 'person-outline';
              }
              return <Icon name={icons} size={size} color={color} />;
            },
          })}>
          <Tabs.Screen
            name="Dashboard"
            component={Dashboard}
            initialParams={(userData = {email: user.email, uid: user.uid})}
          />
          <Tabs.Screen
            name="New Posts"
            component={NewPosts}
            initialParams={(userData = {email: user.email, uid: user.uid})}
          />
          <Tabs.Screen
            name="Profile"
            component={Profile}
            initialParams={(userData = {email: user.email, uid: user.uid})}
          />
        </Tabs.Navigator>
      </>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In">
        {/* <Stack.Screen
          name="Splash Screen"
          component={SplashScreen}
          options={{headerShown: false}}
        /> */}
        {!user ? (
          <>
            <Stack.Screen
              name="Sign In"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Sign Up"
              component={SignUp}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={dashboardRoute}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Options"
              component={Options}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="AxiosTest"
              component={AxiosTest}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="AxiosTestPost"
              component={AxiosTestPost}
              options={{headerShown: true}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
