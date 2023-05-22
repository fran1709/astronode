import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../components/UserProvider";
WebBrowser.maybeCompleteAuthSession();

const Home = () => {

    const navigation = useNavigation();
    const { token, setToken, userInfo, setUserInfo } = useUser();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "636818064798-2r3ovnovmkdilj65qfnb1vsji79eider.apps.googleusercontent.com",
        iosClientId: "636818064798-n1q6lh2qpkg4ovir2sr6ksksuumrqdib.apps.googleusercontent.com",
        webClientId: "636818064798-vcujj7h98jh0dh31hudi5h6u248a9ts1.apps.googleusercontent.com",
    });
    
    useEffect(() => {
        handleEffect();
    }, [response, token]);

    useEffect(() => {
      if(response !== null) {  
        navigation.navigate('Stack'); 
      }
    }, [userInfo, navigation]);

    async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        //(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
    }

    const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
    };

    const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log(error)
    }
    };

    return(
        <View style={styles.container} >
            {userInfo === null &&
            <>
            <Image style={styles.stretch} source={require('../media/appLogo.png')}/>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#3DCAA6'}}>Welcome</Text>
            <Text style={{fontSize: 20, fontWeight: 'normal', marginBottom: 20, color: '#3DCAA6'}}>Please login</Text>
            <TouchableOpacity style={styles.button} disabled={!request} onPress={() => {
                    promptAsync();
                  }}>
                    <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
            </>}
            {userInfo!==null && 
            <>
            <Image style={styles.stretch} source={require('../media/appLogo.png')}/>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#3DCAA6'}}>Welcome</Text>
            <Text style={{fontSize: 20, fontWeight: 'normal', marginBottom: 20, color: '#3DCAA6'}}>{userInfo.name}</Text>
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
            <TouchableOpacity style={styles.button} disabled={!request} onPress={() => {
                    navigation.navigate("Stack");
                  }}>
                    <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            </>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#3DCAA6",
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
    stretch: {
      width: 300,
      height: 200,
      alignSelf:'center',
      resizeMode: 'stretch',
      marginTop: 20,
    },
    button: {
      backgroundColor:"#3DCAA6",
      padding:10,
      marginTop:"5%",
      width:"50%",
      alignSelf:"center",
      borderRadius:10
    },
    buttonText: {
      fontSize:15,
      textAlign:"center",
      color:"white"
    },
});
  

export default Home;