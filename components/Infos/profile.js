import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Profile({ route }) {
  const { userData } = route.params;

  return (
    <View style={styles.container}>
    <Image
      style={styles.userimage}
      source={{
        uri: userData.image_url,
      }}
    />
    <Text style={styles.fullname} >{userData.usual_full_name}</Text>
    <Text style={styles.login} ><Icon name="user" style={styles.icons} size={15} />{userData?.login}</Text>
    <Text style={styles.location} ><Icon name="desktop" style={styles.icons} />{userData?.location}</Text>
    <Text style={styles.email}><Icon name="envelope" style={styles.icons} />{userData?.email}</Text>
    <Text style={styles.wallet}><Icon name="wallet" style={styles.icons} />{userData?.wallet}</Text>
    <Text style={styles.wallet}><Icon name="water" style={styles.icons} />{userData?.pool_month + " " + userData?.pool_year}</Text>
    <Text style={styles.wallet}><Icon name="location-arrow" style={styles.icons} />{userData?.campus[0].city + ", " + userData?.campus[0].country}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      textAlign: 'left',
      // justifyContent: 'center',
      padding: 20,
    },
    userimage: {
      borderRadius: 100,
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
    fullname: {
      fontSize: 40,
    },
    login: {
      fontSize: 20,
      color: 'gray',
    },
    location: {
      fontSize: 20,
      color: 'gray',
    },
    email: {
      fontSize: 20,
      color: 'gray',
    },
    wallet: {
      fontSize: 20,
      color: 'gray',
    },
    icons: {
      margin: 10,
    },
  });