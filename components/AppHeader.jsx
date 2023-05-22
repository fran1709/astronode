import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoImage from '../media/appLogoS.png'; 
import UserModal from "./UserProfile";
import { useUser } from "../components/UserProvider";

const AppHeader = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { token, setToken, userInfo, setUserInfo } = useUser();
    const navigation = useNavigation();
    const handleProfilePress = () => {
      setModalVisible(true);
    };

    const handleSignOut = async () =>  {
        await AsyncStorage.removeItem("@user");
        setUserInfo(null);
        setToken(null);
        navigation.navigate('HomeScreen');
    };

    const handleSearch = (query) => {
        // Perform search operation with the query
        console.log('Search query:', query);
    };

    useEffect(() => {
        getLocalUser();
    }, []);

    const getLocalUser = async () => {
        try {
          const data = await AsyncStorage.getItem("@user");
          if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData && typeof parsedData === "object") {
              setUserInfo(parsedData);
              console.log(parsedData);
            } else {
              console.log("Invalid data format");
            }
          }
        } catch (error) {
          console.log("Error retrieving user information:", error);
        }
      };

  return (
    <View style={styles.container}>
      <Image
        source={LogoImage}
        style={styles.logo}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={handleSearch}
      />
      
      <TouchableOpacity onPress={handleProfilePress}>
        <Image source={{ uri: userInfo?.picture }} style={styles.profileIcon} />
      </TouchableOpacity>
      
      <UserModal
        visible={modalVisible}
        userInfo={userInfo} 
        onClose={() => setModalVisible(false)}
        onLogout={handleSignOut}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#ffffff",
    elevation: 2, 
  },
  logo: {
    width: 100,
    height: 70,
    resizeMode: "contain",
    paddingLeft: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    height: 30,
    width: 70,
    marginLeft: 16,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
});

export default AppHeader;
