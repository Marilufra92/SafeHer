import React, { useContext } from "react"; 
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import Button1 from "../components/Button1";  
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { AlertContext } from "../contexts/AlertContext";  

export default function HomeScreen({ navigation }) {
  const { addAlert } = useContext(AlertContext); // Accedi alla funzione addAlert dal contesto

  const sendAlert = () => {
    // Creazione di un alert con data e ora attuale
    const currentDate = new Date();
    const newAlert = {
      id: currentDate.getTime().toString(),
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    };

    addAlert(newAlert); // Registra l'alert nell'archivio condiviso

    // Mostra un pop-up di conferma
    Alert.alert(
      "Alert Inviato!",
      `Un alert è stato registrato alle ${newAlert.time} del ${newAlert.date}.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/SFH.jpg")}  
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>SafeHer</Text>
        <Text style={styles.subtitle}>
          La tua sicurezza, la nostra priorità.
        </Text>
        <Text style={styles.subtitle}>
          Utilizza l'app per proteggerti in situazioni di emergenza.
        </Text>
        <Button1
          title="Invia Alert"
          onPress={sendAlert}  
        />
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/1522.png")}  
            style={styles.image}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5b5f1", // Colore di sfondo #f5b5f1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,  
  },
  imageContainer: {
    width: 360,  
    height: 100,  
    marginBottom: 40,  
    justifyContent: "center",  
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 45,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 50,
  },
  image: {
    width: "110%",  
    height: "100%",  
    resizeMode: "cover",
  },
  title: {
    fontFamily: "Arial",
    fontSize: 30,  
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",  
    textAlign: "center",  
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 3,
    textAlign: "center",
    marginTop: 10,
  },
});
