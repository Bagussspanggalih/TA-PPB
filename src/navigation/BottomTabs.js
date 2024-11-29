// src/navigation/BottomTabs.js
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Explore from '../screens/ChatBot';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0066CC', // Diubah ke warna biru
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Beranda'
        }}
      />
      <Tab.Screen 
        name="ChatBot" 
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Chat Bot'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          tabBarLabel: 'about'
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingTop: 5,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    }),
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  }
});

export default BottomTabs;