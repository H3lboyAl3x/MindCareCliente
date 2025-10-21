import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";


const { width, height } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function Finalizar_Cadastro({ navigation }: any){

    

    return(
        <SafeAreaProvider>
                <SafeAreaView style={styles.Container} edges={["top"]}>
                    {/* Cabeçalho */}
                    <View style={styles.Cabecario}>
                        <Text style={styles.Titulo}>Finalizar Cadastro</Text>
                    </View>

                    {/* Corpo */}
                    <View style={styles.Corpo}>
                        
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#730FB0",
  },
  Cabecario: {
    flex: 0.18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#730FB0",
  },
  Titulo: {
    color: "#fff",
    fontSize: scale(32),
    fontWeight: "bold",
    textAlign: "center",
  },
  Corpo: {
    flex: 0.82,
    backgroundColor: "#fff",
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
});