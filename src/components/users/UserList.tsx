import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Switch, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import clients from "../../api/clients";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserDetailModal } from "./UserDetailModal";
import { UserEditModal } from "./UserEditModal";

// Constants
const BASE_URL = "http://192.168.0.6:3000";
const UPLOADS_FOLDER = "users";
const AVATAR_FALLBACK_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw&usqp=CAU";

// Component
export const UserList = ({ users, setUsers }) => {
  const [userSwitchState, setUserSwitchState] = useState({});
  const [selectUserId, setSelectUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const initialSwitchState = {};
    users.forEach((user) => {
      initialSwitchState[user._id] = user.active;
    });
    setUserSwitchState(initialSwitchState);
  }, [users]);

  const toggleSwitch = async (userId) => {
    Alert.alert(
      "Confirmar cambio estado",
      "¿Estás seguro de cambiar el estado del usuario?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Cambiar",
          onPress: async () => {
            if (typeof userId === "string" && userId.length > 0) {
              setUserSwitchState((prevState) => ({
                ...prevState,
                [userId]: !prevState[userId],
              }));
              await clients.patch(`/users/edit/${userId}`, {
                active: !userSwitchState[userId],
              });
            } else {
              console.log("Error al cambiar el estado del usuario");
            }
          },
        },
      ]
    );
  };

  const handleDetailUser = async (userId) => {
    // Buscar el usuario seleccionado en la lista de usuarios
    const userDetails = users.find((user) => user._id === userId);
    if (userDetails) {
      setSelectedUserDetails(userDetails);
      setSelectUserId(userId);
      setModalVisible(true);
    }
  };
  const handleDeleteUser = async (userId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de eliminar este usuario?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              // Realizar la solicitud para eliminar el usuario
              await clients.delete(`/users/remove/${userId}`);

              // Actualizar la lista de usuarios después de eliminar
              const updatedUsers = users.filter((user) => user._id !== userId);
              setUsers(updatedUsers);

              // Opcional: Mostrar mensaje de éxito
              Alert.alert("Usuario eliminado correctamente");
            } catch (error) {
              console.error("Error al eliminar usuario:", error);
              // Opcional: Mostrar mensaje de error
              Alert.alert("Error al eliminar usuario");
            } finally {
            }
          },
        },
      ]
    );
  };

  const handleEditUser = (user) => {
    console.log("Usuario seleccionado para editar:", user);
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const closeModal = () => {
    // Lógica para cerrar el modal
    setEditModalVisible(false); // Por ejemplo, si estás utilizando un estado para manejar la visibilidad del modal
  };

  const handleSaveUser = async (userData) => {
    try {
      if (!userData.userId) {
        console.error("ID de usuario no válido:", userData.userId);
        return;
      }
      const response = await clients.patch(`/users/edit/${userData.userId}`, {
        user_name: userData.name,
        user_email: userData.email,
        user_role: userData.role,
      });

      console.log("Response:", response);

      if (
        response &&
        response.data &&
        response.data.message === "User updated"
      ) {
        const updatedUsers = users.map((user) =>
          user._id === userData.userId
            ? {
                ...user,
                user_name: userData.name,
                user_email: userData.email,
                user_role: userData.role,
              }
            : user
        );
        setUsers(updatedUsers);
        Alert.alert("¡Datos del usuario actualizados correctamente!");
        closeModal();
      } else {
        console.error(
          "Error al actualizar los datos del usuario. Detalles de la respuesta:",
          response
        );
        Alert.alert(
          "Error al actualizar los datos del usuario. Inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
      Alert.alert(
        "Error al actualizar los datos del usuario. Inténtalo de nuevo más tarde."
      );
    }
  };

  const renderUserItem = ({ item }) => (
    <ListItem bottomDivider style={styles.listItem}>
      <Avatar
        rounded
        size={60}
        source={{
          uri: item.avatar
            ? `${BASE_URL}/${UPLOADS_FOLDER}/${item.avatar}`
            : AVATAR_FALLBACK_URL,
        }}
      />
      <ListItem.Content style={styles.content}>
        <ListItem.Title style={styles.title}>{item.user_name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {item.user_email}
        </ListItem.Subtitle>
        {/* {item.user_role && (
          <ListItem.Subtitle>{item.user_role}</ListItem.Subtitle>
        )}
        {item.gender && <ListItem.Subtitle>{item.gender}</ListItem.Subtitle>} */}
        {item.address && <ListItem.Subtitle style={styles.subtitle}>{item.address}</ListItem.Subtitle>}
      </ListItem.Content>

      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={userSwitchState[item._id] ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch(item._id)}
          value={userSwitchState[item._id]}
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleDetailUser(item._id)}>
          <Ionicons name="search-outline" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditUser(item)}>
          <Ionicons name="create-outline" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
          <Ionicons name="trash-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </ListItem>
  );

  return (
    <>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item._id}
        style={styles.container}
      />
      <UserDetailModal
        visible={modalVisible}
        closeModal={() => setEditModalVisible(false)}
        userId={selectUserId}
        userName={selectedUserDetails ? selectedUserDetails.user_name : ""}
        userEmail={selectedUserDetails ? selectedUserDetails.user_email : ""}
        userAddress={selectedUserDetails ? selectedUserDetails.address : ""}
      />
      <UserEditModal
        visible={editModalVisible}
        closeModal={() => setEditModalVisible(false)}
        userId={editingUser ? editingUser._id : ""}
        userName={editingUser ? editingUser.user_name : ""}
        userEmail={editingUser ? editingUser.user_email : ""}
        userRole={editingUser ? editingUser.user_role : ""}
        onSave={handleSaveUser}
      />
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    width: "95%",
    height: 100,
  },
  content: {
    marginLeft: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  switchContainer: {
    alignSelf: "center", // Centra el switch horizontalmente
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 60,
    marginRight: 5,
  },
});
