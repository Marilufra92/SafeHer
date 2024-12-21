import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Button1 from "../components/Button1";
import { AlertContext } from "../contexts/AlertContext";  

export default function GeoLocationScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [aggressorLocation, setAggressorLocation] = useState(null); // STALKER dinamico
  const DISTANCE_THRESHOLD = 1; // Distanza critica (in km)

  const { addAlert } = useContext(AlertContext); // Accedi alla funzione addAlert dal contesto

  useEffect(() => {
    (async () => {
      await requestLocationPermission();
    })();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permessi di localizzazione negati",
        "Per favore, abilita i permessi di localizzazione nelle impostazioni del dispositivo per utilizzare questa funzione.",
        [
          { text: "OK" },
          { text: "Apri Impostazioni", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (location) => {
        setUserLocation(location.coords);
        updateAggressorLocation(location.coords); // Aggiorna la posizione dello STALKR
        checkProximity(location.coords, aggressorLocation); // Controlla la vicinanza
      }
    );

    return () => subscription?.remove();
  };

  const updateAggressorLocation = (userCoords) => {
    const randomAngle = Math.random() * 2 * Math.PI; // Angolo casuale
    const offsetDistance = 0.1; // Distanza in km (100 metri)

    const newLatitude =
      userCoords.latitude + offsetDistance * Math.cos(randomAngle);
    const newLongitude =
      userCoords.longitude + offsetDistance * Math.sin(randomAngle);

    setAggressorLocation({
      latitude: newLatitude,
      longitude: newLongitude,
    });
  };

  const checkProximity = (userCoords, targetCoords) => {
    if (!targetCoords) return;
    const distance = calculateDistance(userCoords, targetCoords);
    if (distance < DISTANCE_THRESHOLD) {
      Alert.alert(
        "Attenzione!",
        "Sei vicino al punto monitorato. Avvisa le autorità!"
      );
    }
  };

  const calculateDistance = (coords1, coords2) => {
    const R = 6371; // Raggio della Terra in km
    const dLat = ((coords2.latitude - coords1.latitude) * Math.PI) / 180;
    const dLon = ((coords2.longitude - coords1.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((coords1.latitude * Math.PI) / 180) *
        Math.cos((coords2.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distanza in km
  };

  const sendAlert = () => {
    addAlert(); // Registra l'alert nel contesto
    Alert.alert(
      "Alert inviato!",
      "Un messaggio di emergenza è stato inviato con la tua posizione."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Geolocalizzazione</Text>
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="La tua posizione"
            description="Sei qui"
            pinColor="blue"
          />
          {aggressorLocation && (
            <Marker
              coordinate={aggressorLocation}
              title="STALKER"
              description="Punto monitorato"
              pinColor="red"
            />
          )}
        </MapView>
      ) : (
        <Text>Caricamento della posizione...</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button1 title="Invia Alert" onPress={sendAlert} color="#d32f2f" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#f5b5f1",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#333",
    display: "none",
  },
  map: {
    flex: 1,
    width: "100%",
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#9061a9",
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#f5b5f1",
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
});
