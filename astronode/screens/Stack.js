import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import AppHeader from "../components/AppHeader";
import { API } from "../astronode";

const Stack = () => {

    const getSaludo = async () => {
        const saludo = await API.get('/saludo');
        console.log(saludo.data);
    }
    const getUsuarios = () =>{
        const users = API.get('/usuarios');
        console.log(users);
    }
    
    return(
        <View>
            <AppHeader/>
            <View>
                <TouchableOpacity
                    onPress={getSaludo}
                    style={{backgroundColor:"cyan", width: 120,
                    height: 50,
                    backgroundColor: '#3f51b5',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'}}
                    
                >
                    <Text>Obtener Saludo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={getUsuarios}
                    style={{backgroundColor:"cyan", width: 120,
                    height: 50,
                    backgroundColor: '#3f51b5',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'}}
                    
                >
                    <Text>Obtener Usuarios</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    );
}

export default Stack;