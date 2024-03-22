import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export const Home = ({ navigation }) => {
  // Declaración de variables y métodos para modificar su valor inicial
  const [visibleModal, setVisibleModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState("");
  const [selectedIdRadioButton, setSelectedIdRadioButton] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const gender = useMemo(
    () => [
      {
        id: "1",
        label: "Femenino",
        value: "Femenino",
      },
      {
        id: "2",
        label: "Masculino",
        value: "Masculino",
      },
    ],
    []
  );

  // Método para mostrar u ocultar el modal
  const showModal = () => {
    setVisibleModal(!visibleModal);
    // console.log(visibleModal);
  };

  // Hook de react que se ejecuta cuando se carga el componente
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Método para obtener los departamentos de la API
  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        "https://www.datos.gov.co/resource/xdk5-pm3f.json"
      );
      const data = await response.json();
      const departments = data.map(
        (item_department) => item_department.departamento
      );
      const uniqueDepartments = [...new Set(departments)];
      // console.log(uniqueDepartments);
      setDepartments(uniqueDepartments);
    } catch (error) {
      console.log(error);
    }
  };

  //Método para crear usuario

  const handleDataForm = async () => {
    console.log(selectedIdRadioButton);
    console.log(departmentSelected);
    console.log(userName);
    console.log(userEmail);

    try {
      const url = "http://192.168.0.4:3000/api/v1/users/new-user";
      const data = {
        user_name: userName,
        user_email: userEmail,
        gender: selectedIdRadioButton,
        address: departmentSelected,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      console.log(responseData);
      Alert.alert(
        "Registro Exitoso",
        "¡Bienvenido! Por favor, inicia sesión para continuar."
      );
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
      navigation.navigate("TabNavigator");
    }
  };

  return (
    <LinearGradient
      colors={["rgba(77, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/home_music.jpg")} // ajusta la ruta de la imagen según sea necesario
              style={styles.image}
            />
          </View>
          <Text style={styles.textHome}>Regístrese aquí:</Text>
          <View style={styles.circleButtonContainer}>
            <Pressable onPress={showModal} style={styles.circleButton}>
              <MaterialIcons name="add" size={34} color="black" />
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visibleModal}
          >
            <View style={styles.modalContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Registro</Text>
                <Pressable onPress={showModal} style={styles.closeModal}>
                  <MaterialIcons name="close" size={18} color="black" />
                </Pressable>
              </View>
              <View style={styles.content}>
                <View>
                  <Image
                    source={require("../assets/images/png/logo.png")}
                    style={styles.logo}
                  />
                </View>
                <TextInput
                  placeholder="Nombre"
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                  autoCapitalize="words"
                  autoCorrect={false}
                  style={styles.input}
                  keyboardType="default"
                />

                <TextInput
                  placeholder="Correo"
                  value={userEmail}
                  onChangeText={(text) => setUserEmail(text)}
                  autoCapitalize="words"
                  autoCorrect={false}
                  style={styles.input}
                  keyboardType="email-address"
                />
                <Text>Género:</Text>
                <View style={styles.radioGroupStyle}>
                  <RadioGroup
                    radioButtons={gender}
                    selectedId={selectedIdRadioButton}
                    onPress={(radioButtons) =>
                      setSelectedIdRadioButton(radioButtons[0])
                    }
                  />
                </View>

                <View style={styles.pickerContainer}>
                  <Text>Departamento:</Text>
                  <Picker
                    selectedValue={departmentSelected}
                    onValueChange={(itemValue) =>
                      setDepartmentSelected(itemValue)
                    }
                    style={styles.picker}
                  >
                    {departments.map((department, item_department) => (
                      <Picker.Item
                        key={item_department}
                        label={department}
                        value={department}
                        color="#000"
                        style={styles.pickerItemStyle}
                      />
                    ))}
                  </Picker>
                </View>

                <View style={styles.buttonSection}>
                  <Pressable onPress={handleDataForm} style={styles.sendButton}>
                    <Text>Enviar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  circleButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 42,
    borderColor: "#ffd33d",
    marginHorizontal: 120,
    marginBottom: 30,
  },
  circleButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 42,
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  modalContent: {
    flex: 1,
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  closeModal: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  textHome: {
    color: "white",
    fontSize: 18,
    marginBottom: 40,
    marginTop: 10,
    textAlign: "center",
  },
  titleContainer: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    width: "100%",
    padding: 20,
    alignContent: "center",
    alignItems: "center",
  },
  buttonSection: {
    width: "100%",
    bottom: 10,
    backgroundColor: "orange",
    borderRadius: 20,
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: "100%",
  },
  sendButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffd33d",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  radioGroupStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  pickerContainer: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    padding: 5,
    fontSize: 12,
    marginBottom: 20,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  pickerItemStyle: {
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#000",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
