import React from 'react'
import { StyleSheet, FlatList, Text, ScrollView, View, SafeAreaView, Image } from 'react-native';


const Item = ({ title, mark }) => (
  <View style={styles.item}>
    <Text style={styles.text} >{title}<Text style={styles.mark}>{mark ? `(${mark})` : ''}</Text></Text>
  </View>
);

export default function Projects({ route }) {
  const { userData } = route.params;

  const renderItem = ({ item }) => (
    <Item title={item.project.name} mark={item.final_mark} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <FlatList
        data={userData.projects_users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text>projects</Text>
      </ScrollView>
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
      // boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',

    },
    text: {
      fontWeight: 'bold',
    },
    mark: {
      color: 'gray',
    },
  });