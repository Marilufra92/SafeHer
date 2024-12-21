import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const STORAGE_KEY = "alertArchive";

  // Caricare l'archivio salvato all'avvio
  useEffect(() => {
    const loadArchive = async () => {
      try {
        const savedAlerts = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedAlerts) {
          setAlerts(JSON.parse(savedAlerts));
        }
      } catch (error) {
        console.error("Errore nel caricamento dell'archivio:", error);
      }
    };

    loadArchive();
  }, []);

  // Salvare l'archivio
  const saveArchive = async (newAlerts) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAlerts));
    } catch (error) {
      console.error("Errore nel salvataggio dell'archivio:", error);
    }
  };

  // Funzione per aggiungere un nuovo alert
  const addAlert = () => {
    const currentDate = new Date();
    const alertData = {
      id: currentDate.getTime().toString(),
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    };

    const updatedAlerts = [...alerts, alertData];
    setAlerts(updatedAlerts);
    saveArchive(updatedAlerts);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
