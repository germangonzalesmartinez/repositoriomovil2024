import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

// Constants
const BASE_URL = "http://192.168.0.4:3000";
const UPLOADS_FOLDER = "uploads/users";
const AVATAR_FALLBACK_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw&usqp=CAU";

// Component
export const UserList = ({ users }) => {
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
    </ListItem>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderUserItem}
      keyExtractor={(item) => item._id}
      style={styles.container}
    />
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
});
