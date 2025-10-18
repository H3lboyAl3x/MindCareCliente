import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function Confirmar_telefone({ navigation, route }: any){
    const {nome_completo, data_de_nascimento, genero, telefone, codigo} = route.params;

    const [confimacao, setconfirmacao] = useState("");
    const adicionarCaractere = (caractere: string) => {
        if (confimacao.length < 6) {
            setconfirmacao(confimacao + caractere);
        }
    };

    

    return(
        <SafeAreaProvider>
                <SafeAreaView style={styles.Container} edges={["top"]}>
                    {/* Cabeçalho */}
                    <View style={styles.Cabecario}>
                        <Text style={styles.Titulo}>Confirma seu Telefone</Text>
                    </View>

                    {/* Corpo */}
                    <View style={styles.corpo}>
                        <Text style={styles.Texto}>Voce recebera um codigo de verificao no numero:{'\n'}9...{'\n'}.Digite este codigo a baixo para confirmar.</Text>
                        <View style={styles.Blocos}>
                            <Text style={styles.Bloco}>{confimacao[0]}</Text>
                            <Text style={styles.Bloco}>{confimacao[1]}</Text>
                            <Text style={styles.Bloco}>{confimacao[2]}</Text>
                            <Text style={styles.Bloco}>{confimacao[3]}</Text>
                            <Text style={styles.Bloco}>{confimacao[4]}</Text>
                            <Text style={styles.Bloco}>{confimacao[5]}</Text>
                        </View>

                        {/*teclado*/}
                        <View style={styles.Teclado}>
                            {/*123*/}
                            <View style={styles.Conjunto_tecla}>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("1")}>
                                    <Text style={styles.numero}>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("2")}>
                                    <Text style={styles.numero}>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("3")}>
                                    <Text style={styles.numero}>3</Text>
                                </TouchableOpacity>
                            </View>
                            {/*456*/}
                            <View style={styles.Conjunto_tecla}>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("4")}>
                                    <Text style={styles.numero}>4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("5")}>
                                    <Text style={styles.numero}>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("6")}>
                                    <Text style={styles.numero}>6</Text>
                                </TouchableOpacity>
                            </View>
                            {/*789*/}
                            <View style={styles.Conjunto_tecla}>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("7")}>
                                    <Text style={styles.numero}>7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("8")}>
                                    <Text style={styles.numero}>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("9")}>
                                    <Text style={styles.numero}>9</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Conjunto_tecla}>
                                <TouchableOpacity style={styles.Tecla} onPress={() => setconfirmacao("")}>
                                    <Ionicons name="trash-bin-outline" size={30} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => adicionarCaractere("0")}>
                                    <Text style={styles.numero}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Tecla} onPress={() => alert(confimacao)}>
                                    <Ionicons name="arrow-forward-outline" size={30} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
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
    width: "100%",
    height: "15%",
    backgroundColor: "#730FB0",
    alignItems: "center",
    justifyContent: "center",
  },
  Titulo: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    alignItems: "center",
  },
  corpo: {
    width: "100%",
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  Texto: {
    textAlign: "center",
    fontSize: 15,
    color: "#730FB0",
    marginTop: 5,
  },
  Blocos: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "center"
  },
  Bloco:{
    width: 40,
    height: 40,
    backgroundColor: "#AAAAAA",
    marginHorizontal: 5,
    borderRadius: 15,
    textAlign: "center",
    padding: 10
  },
  Teclado: {
    alignSelf: "center",
    marginTop: 0
  },
  Conjunto_tecla: {
    flexDirection: "row",
    marginVertical: 20,
  },
  Tecla: {
    width: 80,
    height: 80,
    backgroundColor: "#730FB0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  numero: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    
  }
});