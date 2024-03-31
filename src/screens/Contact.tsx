import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { UserList } from "../components/users/UserList";
import { SafeAreaView } from "react-native-safe-area-context";
import clients from "../api/clients";

export const Contact = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await clients.get("/users");
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      <View style={styles.content}>
        {isLoading && <Text>Cargando</Text>}
        {!isLoading && <UserList users={users} setUsers={setUsers} />}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "orange",
  },
};
