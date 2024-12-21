import React, { useContext } from "react"; 
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import Button1 from "../components/Button1"; // Modifica il percorso se necessario
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { AlertContext } from "../contexts/AlertContext"; // Importa il contesto per l'archivio degli alert

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
            source={require("../assets/SFH.jpg")} // Percorso dell'immagine
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
          onPress={sendAlert} // Funzione aggiornata per includere il pop-up
        />
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/1522.png")} // Percorso dell'immagine
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
    padding: 20, // Ho aggiunto un po' di padding per evitare che il contenuto tocchi i bordi
  },
  imageContainer: {
    width: 360, // Imposta una larghezza relativa per l'immagine
    height: 100, // Mantieni l'altezza a 100 (o regola come preferisci)
    marginBottom: 40, // Distanza tra l'immagine e il testo
    justifyContent: "center", // Centra l'immagine nella view
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 45,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 50,
  },
  image: {
    width: "110%", // Imposta l'immagine per adattarsi alla larghezza del contenitore
    height: "100%", // Adatta anche l'altezza
    resizeMode: "cover",
  },
  title: {
    fontFamily: "Arial",
    fontSize: 30, // Aumentato il font per un titolo più visibile
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Colore del testo
    textAlign: "center", // Centra il testo
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 3,
    textAlign: "center",
    marginTop: 10,
  },
});
