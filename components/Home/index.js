import React from 'react'
import { StyleSheet, Text, ImageBackground, View, Button, Pressable, TextInput} from 'react-native';
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
          border: '1px solid whitesmoke',
        },
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          borderColor: "whitesmoke",
          color: "whitesmoke",
        },
        image : {
          flex: 1,
          justifyContent: "center",
          alignItems: 'center',
        },
        logo : {
          color: "whitesmoke",
          fontSize: 40,
          fontFamily: "Freehand-Regular"
        },
        title : {
          color: "whitesmoke",
          fontSize: 18,
          fontFamily: "Roboto"
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
            keyboardType="numeric"
          />
          <Pressable style={styles.button} title="Search" onPress={() => getUser(login)}><Text style={styles.text}>Search</Text></Pressable>
          </ImageBackground>
        </View>
        </>
      )
}




