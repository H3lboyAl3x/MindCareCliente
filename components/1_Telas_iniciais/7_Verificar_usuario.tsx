import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function Verificar_usuario({ navigation, route }: any){
    const {codigo, telefone} = route.params;

    const [confimacao, setconfirmacao] = useState("");
    const adicionarCaractere = (caractere: string) => {
        const novoCodigo = confimacao + caractere;

        if (novoCodigo.length <= 6) {
            setconfirmacao(novoCodigo);
        }

        if (novoCodigo.length === 6) {
            if (novoCodigo === codigo) {
                alert(codigo);
            }
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
                    <View style={styles.Corpo}>
                        <Text style={styles.Texto}>Voce recebera um codigo de verificao pelo whatsapp, no numero:{'\n'}+244{telefone}{'\n'}.Digite este codigo a baixo para confirmar.</Text>
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
                                <View style={[styles.Tecla, {backgroundColor: 'transparent'}]}/>
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
  Texto: {
    textAlign: "center",
    fontSize: scale(13),
    color: "#730FB0",
    marginTop: scale(5),
  },
  Blocos: {
    flexDirection: "row",
    marginVertical: scale(5),
    justifyContent: "center"
  },
  Bloco:{
    width: scale(35),
    height: scale(35),
    backgroundColor: "#AAAAAA",
    marginHorizontal: scale(5),
    borderRadius: scale(15),
    textAlign: "center",
    padding: scale(10)
  },
  Teclado: {
    alignSelf: "center",
  },
  Conjunto_tecla: {
    flexDirection: "row",
    marginVertical: scale(10),
  },
  Tecla: {
    width: scale(70),
    height: scale(70),
    backgroundColor: "#730FB0",
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(15),
  },
  numero: {
    color: "#fff",
    fontSize: scale(25),
    fontWeight: "bold",
    
  }
});