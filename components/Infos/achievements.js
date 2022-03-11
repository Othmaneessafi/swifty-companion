import React from 'react'
import { StyleSheet, FlatList, Text, ScrollView, View, SafeAreaView, Image } from 'react-native';


const Item = ({ title, description }) => (
  <View style={styles.item}>
    <Text style={styles.text} >{title}</Text>
    <Text style={styles.mark} >{description}</Text>
  </View>
);

export default function Achievements({ route }) {
  const { userData } = route.params;

  const renderItem = ({ item }) => (
    <Item title={item.name} description={item.description} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      {/* <ScrollView style={styles.scrollView}> */}
      <FlatList
        data={userData.achievements}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
    },
    Button: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80vw'
    },
    scrollView: {
      width: '100%',
      padding: 10,
    },
    item: {
      borderRadius: 10,
      backgroundColor: 'whitesmoke',
      padding: 20,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,

    },
    text: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    mark: {
      color: 'grey',
    },
    title: {
      fontSize: 25,
      margin: 10,
    },
  });