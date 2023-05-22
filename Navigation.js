import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Vistas 
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Stack from "./screens/Stack";


const HomeStackNavigator = createNativeStackNavigator();
function MyStack(){
    return(
        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen"
        >
            <HomeStackNavigator.Screen
                name="HomeScreen"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStackNavigator.Screen
                name="Stack"
                component={Stack}
                options={{
                    headerBackTitleVisible: false,
                    headerShown: false
                }}
            />
        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function MyTabs(){
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:'blue'
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={MyStack}
                options={{
                    tabBarLabel:'Home Page',
                    tabBarIcon: ({color, size}) =>(
                        <MaterialCommunityIcons name="home" color={color} size={size}/>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings}
                options={{
                    tabBarLabel:'Settings',
                    tabBarIcon: ({color, size}) =>(
                        <MaterialCommunityIcons name="brightness-5" color={color} size={size}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation(){
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}