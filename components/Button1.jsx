import React from "react";
import { Pressable, Text, View } from "react-native";

function Button1({ title, onPress }) {
  return (
    <Pressable
      style={{
        marginTop: 60,
        backgroundColor: "#cf2323",
        borderRadius: 7,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 52,
        marginBottom: 15,
        shadowColor: "black",  
        shadowOffset: { width: 2, height: 5 },  
        shadowOpacity: 0.6,  
        shadowRadius: 5,
        elevation: 5,  // per android
      }}
      onPress={onPress}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
        {title}
      </Text>
    </Pressable>
  );
}

export default Button1;
