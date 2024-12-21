import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Linking,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertContext } from "../contexts/AlertContext"; // Importa il contesto degli alert

export default function HelpScreen() {
  const { alerts } = useContext(AlertContext); // Ottieni gli alert dal contesto
  const [showAlerts, setShowAlerts] = useState(false); // Stato per la visibilità degli alert
  const [isChatVisible, setIsChatVisible] = useState(false); // Stato per la visibilità della chat
  const [isInfoVisible, setIsInfoVisible] = useState(false); // Stato per la visibilità del pop-up "Info Utili"
  const [messages, setMessages] = useState([
    { id: 1, text: "Ciao! Come posso aiutarti oggi?", sender: "bot" },
  ]);
  const [input, setInput] = useState(""); // Stato per il campo di input della chat

  const toggleAlerts = () => {
    setShowAlerts((prevState) => !prevState); // Inverte la visibilità della lista degli alert
  };

  // Funzione per gestire la chiamata al numero 1522
  const handleCall1522 = () => {
    Linking.openURL("tel:1522").catch((err) =>
      console.error("Errore nella chiamata:", err)
    );
  };

  // Funzione per mostrare un alert (fittizio) quando si clicca su "Archivio Alert"
  const showArchivioAlert = () => {
    Alert.alert("Archivio Alert", "Questa funzionalità è in fase di sviluppo.");
  };

  // Funzione per inviare un messaggio nella chat
  const handleSendMessage = () => {
    if (input.trim()) {
      // Aggiungi il messaggio dell'utente
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: input, sender: "user" },
      ]);

      // Simula la risposta del bot dopo un ritardo
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "Sto cercando informazioni...",
            sender: "bot",
          },
        ]);
      }, 1000);

      // Pulisci il campo di input
      setInput("");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Card 1: Info Utili */}
          <View style={styles.card}>
            <Image
              source={require("../assets/infoutil.png")}
              style={styles.icon}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsInfoVisible(true)}
            >
              <Text style={styles.buttonText}>Info Utili</Text>
            </TouchableOpacity>
          </View>

          {/* Card 2: Avvia Chat */}
          <View style={styles.card}>
            <Image
              source={require("../assets/chattt.png")}
              style={styles.icon}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsChatVisible(true)}
            >
              <Text style={styles.buttonText}>Avvia Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Card 3: Chiama 1522 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/call_12742778 (1).png")}
              style={styles.icon}
            />
            <TouchableOpacity style={styles.button} onPress={handleCall1522}>
              <Text style={styles.buttonText}>Chiama 1522</Text>
            </TouchableOpacity>
          </View>

          {/* Card 4: Archivio Alert */}
          <View style={styles.card}>
            <Image
              source={require("../assets/archiv.png")}
              style={styles.icon}
            />
            <TouchableOpacity style={styles.button} onPress={toggleAlerts}>
              <Text style={styles.buttonText}>Archivio Alert</Text>
            </TouchableOpacity>
          </View>

          {/* Sezione Archivio Alert */}
          {showAlerts && (
            <>
              <Text style={styles.archiveTitle}>Archivio Alert</Text>
              {alerts.length > 0 ? (
                alerts.map((item, index) => (
                  <View key={index} style={styles.alertItem}>
                    <Text style={styles.alertText}>
                      🕒 {item.time} - 📅 {item.date}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noAlertsText}>
                  Nessun alert registrato.
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* Modal per la chat */}
      <Modal
        visible={isChatVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsChatVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.chatBox}>
            <ScrollView contentContainerStyle={styles.chatContainer}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Campo di input per inviare messaggi */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Scrivi un messaggio..."
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>Invia</Text>
              </TouchableOpacity>
            </View>
            {/* Pulsante per chiudere la chat */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsChatVisible(false)} // Chiudi il pop-up
            >
              <Text style={styles.closeButtonText}>Chiudi Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal per "Info Utili" */}
      <Modal
        visible={isInfoVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsInfoVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.infoBox}>
          <Text style={styles.infoText}>
          <Text style={styles.boldText}>Come funziona SafeHer?{"\n\n"}</Text>
  
          <Text style={styles.boldText}> {'\u2022'} Avvia una chat: </Text>Se preferisci comunicare in modo discreto, puoi avviare una chat all'interno dell'app. Un assistente virtuale ti guiderà in modo sicuro attraverso le tue esigenze, senza che tu debba interagire vocalmente. {"\n\n"}
          <Text style={styles.boldText}>{'\u2022'} Chiama il numero di emergenza 1522 con un clic: </Text>Se ti trovi in una situazione di pericolo, puoi chiamare immediatamente il numero 1522 per ricevere supporto. Basta premere un pulsante e il numero verrà composto per te in modo automatico, senza che tu debba fare altro. {"\n\n"}
          <Text style={styles.boldText}>{'\u2022'} Archivio Alert: </Text>Puoi tenere traccia degli alert e delle situazioni di emergenza che potrebbero servire alle autorità competenti per prendere provvedimenti.
</Text>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsInfoVisible(false)} // Chiudi il pop-up
            >
              <Text style={styles.closeButtonText}>Chiudi Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5b5f1",
  },
  scrollContainer: {
    paddingBottom: 30, // Assicura spazio per scorrere fino alla fine
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#9061a9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  archiveTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 10,
  },
  alertItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  alertText: {
    fontSize: 16,
    color: "#555",
  },
  noAlertsText: {
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
    marginTop: 10,
  },

  // Styles for the chat modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Sfondo trasparente per il pop-up
  },
  chatBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    height: "70%",
  },
  chatContainer: {
    paddingBottom: 10,
  },
  userMessage: {
    backgroundColor: "#d1e7ff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: "flex-end",
    maxWidth: "70%",
  },
  botMessage: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#9061a9",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#ff6f61",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Styles for Info Utili modal
  infoBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },

  boldText: {
    fontWeight: 'bold',  
    fontSize: 16,        
    color: "#333",       
  }
});
