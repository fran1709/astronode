import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image} from "react-native";
import {Ionicons} from '@expo/vector-icons'

const UserModal = ({ visible, userInfo, onClose, onLogout }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={30} color="#3DCAA6"/>
          </TouchableOpacity>
          <Image
          source={{ uri: userInfo?.picture }}
          style={styles.profilePicture}
          />
          <Text style={styles.userName}>{userInfo?.name}</Text>
          <Text style={styles.userEmail}>{userInfo?.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#3DCAA6',
  },
  userEmail: {
    fontSize: 16,
    textAlign: 'center',
    color: '#3DCAA6',
  },
  logoutButton: {
    backgroundColor: '#3DCAA6',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  logoutButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});


export default UserModal;
