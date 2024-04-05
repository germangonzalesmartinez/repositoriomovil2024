import React from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const UserDetailModal = ({
  visible,
  closeModal,
  userId,
  userName,
  userEmail,
  userAddress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>ID: {userId}</Text>
          <Text>Nombre: {userName}</Text>
          <Text>Correo electrónico: {userEmail}</Text>
          <Text>Dirección: {userAddress}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={{ color: "orange", marginTop: 10 }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
