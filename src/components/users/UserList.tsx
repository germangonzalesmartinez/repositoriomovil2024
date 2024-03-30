import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Switch, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import clients from "../../api/clients";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserDetailModal } from "./UserDetailModal";

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
    setSelectUserId(userId);
    setModalVisible(true);
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
              const updatedUsers = users.filter(user => user._id !== userId);
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
        {item.user_role && (
          <ListItem.Subtitle>{item.user_role}</ListItem.Subtitle>
        )}
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
        closeModal={() => setModalVisible(false)}
        userId={selectUserId}
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
    fontSize: 16,
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
