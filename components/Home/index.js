import React from 'react'
import { StyleSheet, Text, ImageBackground, View, Button, Pressable, TextInput} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
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
          console.log(response.data);
          await AsyncStorage.setItem("access_token", JSON.stringify(response.data));
          return(response.data)
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
        var token = await AsyncStorage.getItem("access_token");
        if (token){
          token = JSON.parse(token);
          if ((token.created_at + token.expires_in) <= (Date.now() / 1000)) {
              console.log("token expired");
              token = await getToken();
          }
        } else token = await getToken();
        const response = await axios.get(`https://api.intra.42.fr/v2/users/${login.trim().toLowerCase()}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`
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
    const auth = async (login) => {
      const token = await getToken();
      try {
        const response = await axios.get(`https://api.intra.42.fr/oauth/authorize?client_id=185fe61bbde778abe84872211f868a11b5cba96e6b460c69c48c7bca64f85dff&redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F&response_type=code`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`
            }
          } 
        );
        if (response) {
          console.log(response)
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
          // backgroundColor: '#fff',
          // alignItems: 'center',
          // justifyContent: 'center',
        },
        button: {
          backgroundColor: 'transparent',
          width: 100,
          textAlign: 'center',
          borderRadius: 10,
          padding: 10,
          // border: '1px solid whitesmoke',
          borderWidth: 1,
          borderColor: "whitesmoke",
        },
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          borderColor: "whitesmoke",
          color: "whitesmoke",
          width: 200,
        },
        image : {
          flex: 1,
          justifyContent: "center",
          alignItems: 'center',
        },
        logo : {
          color: "whitesmoke",
          fontSize: 40,
        },
        title : {
          color: "whitesmoke",
          fontSize: 18,
        },
        text : {
          color: "whitesmoke",
        },
      });

      const image = { uri: "https://42.fr/wp-content/uploads/2021/06/Rectangle-3-1024x774.png" };
      return (
        <>
        <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.logo} >Swifty-companion</Text>
          <Text style={styles.title} >Search for login</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeLogin}
            value={login}
            placeholder="Enter login"
          />
          <Pressable style={styles.button} title="Search" onPress={() => getUser(login)}><Text style={styles.text}>Search</Text></Pressable>
          </ImageBackground>
        </View>
        </>
      )
}




