import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export const UserEditModal = ({ visible, closeModal, userId, userName, userEmail, userRole, onSave }) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [role, setRole] = useState(userRole);
  

  console.log('userName:', userName);
console.log('userEmail:', userEmail);
console.log('userRole:', userRole);
console.log('Valor de email:', email);

useEffect(() => {
    setName(userName);
    setEmail(userEmail);
    setRole(userRole);
  }, [userName, userEmail, userRole]);


  const handleSave = () => {
    onSave({ userId, name, email, role });
    closeModal();
  };
  
  
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
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={role}
            onChangeText={setRole}
            placeholder="Rol"
          />
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={styles.button}>
            <Text style={styles.buttonText}>Cancelar</Text>
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
    width: "60%", // Ancho del modal
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
  input: {
    width: "80%", // Ancho de los campos de entrada
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "80%", // Ancho de los botones
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});