import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home';
import ProfileScreen from './profile';
import ProjectsScreen from './projects';
import AchievementsScreen from './achievements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


export default function index({ route }) {

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height:70,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } else if (route.name === 'Projects') {
              iconName = focused ? 'folder-open' : 'folder-open-outline';
            } else if (route.name === 'Achievements') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'search-circle' : 'search-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
      })
    }
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}} />
      <Tab.Screen name="Projects" component={ProjectsScreen} options={{ headerShown: false}} />
      <Tab.Screen name="Achievements" component={AchievementsScreen} options={{ headerShown: false}} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      padding: 10,
    },
    userimage: {
      borderRadius: "100%",
      width: 100,
      height: 100
    },
    Button: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80vw'
    },
  });