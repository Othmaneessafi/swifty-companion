import React from 'react'
import { StyleSheet, Text, View, Button, Pressable, TextInput} from 'react-native';
import axios from 'axios';

export default function Index({ navigation }) {
    const [login, onChangeLogin] = React.useState("");

    const getToken = async () => {
      try {
        const response = await axios.post(`https://api.intra.42.fr/oauth/token`,
          {
            grant_type: "client_credentials",
            client_id: "185fe61bbde778abe84872211f868a11b5cba96e6b460c69c48c7bca64f85dff",
            client_secret: "67818d94253e168245c7be72599af92a97f4e7dc22543e2104f67fa661857146",
          }
        )
        if (response.data) {
          return(response.data.access_token)
        }
        else {
          console.log("error");
        }
      } catch (error) {
        console.log("catch");
      }
    }
    
    const getUser = async (login) => {
    
      try {
        const token = await getToken();
        console.log(login)
        const response = await axios.get(`https://api.intra.42.fr/v2/users/${login}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          } 
        );
        if (response.data) {
          console.log(response.data)
          navigation.navigate('Infos', {userData: response.data})
        }
        else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        button: {
          backgroundColor: 'transparent',
          width: 100,
          textAlign: 'center',
          borderRadius: 10,
          padding: 10,
          border: '1px solid black'
        },
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
        },
      });

  return (
    <>
    <View style={styles.container}>
      <Text>Home page</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLogin}
        value={login}
        placeholder="Enter login"
        keyboardType="numeric"
      />
      <Pressable style={styles.button} title="Search" onPress={() => getUser(login)}><Text>Search</Text></Pressable>
    </View>
    </>
  )
}




