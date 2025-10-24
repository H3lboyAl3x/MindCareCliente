import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function Finalizar_Cadastro({ navigation, route }: any){
    const {nome_completo, data_de_nascimento, genero, telefone} = route.params;
    const [mostra, setmostra] = useState(true);
    const olho: keyof typeof Ionicons.glyphMap = mostra ? "eye-off-outline" : "eye-outline";

    // login
    const [senha, setsenha] = useState("");
    const [confirmar_senha, setconfirmar_senha] = useState("");
    const [informar, setinformar] = useState("");
    
    const Finalizar = async () => {
        try {
            if (senha === "" || confirmar_senha === "") {
                setinformar("Preencha todos os campos, por favor");
            }else if(senha != confirmar_senha){
                setinformar("As senhas sao diferentes!")
            }else if (senha === confirmar_senha) {

                const response1 = await axios.get("https://mindcare-api.onrender.com/MindCare/API/credencia");
                const credencias = response1.data;
                const credencia = credencias.find(
                    (u: { telefone: string}) =>
                    u.telefone === telefone
                );

                if (!credencia)
                {
                    const novo_usuario = await axios.post("https://mindcare-api.onrender.com/MindCare/API/usuario", {
                        nome: nome_completo,
                        data_de_nascimento,
                        genero,
                        estado: true
                    });
                    await axios.post("https://mindcare-api.onrender.com/MindCare/API/credencia", {
                        id: novo_usuario.data.id,
                        telefone: telefone,
                        senha
                    });
                }else {
                    setinformar("Ja existe um usuario com esses dados! por favor, se esqueceu a senha realiza a alteracao da mesma ou entre em contacto com o apoio ao cliente.")
                }
            }
        } catch (error) {
            alert("Erro de conexão. Tente novamente.");
        }
    };

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.Container} edges={["top"]}>
                {/* Cabeçalho */}
                <View style={styles.Cabecario}>
                    <Text style={styles.Titulo}>Finalizar cadastro</Text>
                </View>
                {/* Corpo */}
                <View style={styles.Corpo}>
                    <Text style={styles.Texto}>Senha</Text>
                    <View style={styles.SenhaContainer}>
                        <TextInput style={styles.CaixaSenha} placeholder="***..." secureTextEntry={mostra} value={senha} onChangeText={setsenha}/>
                        <TouchableOpacity style={styles.Mostrar} onPress={() => setmostra(!mostra)}>
                            <Ionicons name={olho} size={scale(24)} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.Texto}>Confirmar senha</Text>
                    <View style={styles.SenhaContainer}>
                        <TextInput style={styles.CaixaSenha} placeholder="***..." secureTextEntry={mostra} value={confirmar_senha} onChangeText={setconfirmar_senha}/>
                        <TouchableOpacity style={styles.Mostrar} onPress={() => setmostra(!mostra)}>
                            <Ionicons name={olho} size={scale(24)} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.Informar}>{informar}</Text>
                    {/* Rodapé */}
                    <TouchableOpacity style={styles.Botao} onPress={() => Finalizar()}>
                        <Text style={styles.BotaoTexto}>Finalizar</Text>
                    </TouchableOpacity>
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
        flex: 0.25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#730FB0",
        paddingHorizontal: scale(10),
    },
    Titulo: {
        color: "#fff",
        fontSize: scale(34),
        fontWeight: "bold",
        textAlign: "center",
    },
    Corpo: {
        flex: 0.75,
        backgroundColor: "#fff",
        borderTopLeftRadius: scale(25),
        borderTopRightRadius: scale(25),
        paddingHorizontal: scale(20),
        paddingTop: scale(10),
    },
    Texto: {
        fontSize: scale(18),
        color: "#730FB0",
        marginVertical: scale(5),
    },
    SenhaContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        borderRadius: scale(10),
        width: "100%",
        marginBottom: scale(10),
    },
    CaixaSenha: {
        flex: 1,
        fontSize: scale(18),
        paddingVertical: scale(12),
        paddingHorizontal: scale(15),
    },
    Mostrar: {
        padding: scale(10),
        justifyContent: "center",
        alignItems: "center",
    },
    Informar: {
        marginLeft: scale(5),
        color: "red",
        fontSize: scale(14),
        marginBottom: scale(5),
    },
    Botao: {
        width: "100%",
        backgroundColor: "#730FB0",
        borderRadius: scale(10),
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scale(14),
        marginTop: scale(10),
    },
    BotaoTexto: {
        color: "#fff",
        fontSize: scale(20),
        fontWeight: "600",
    },
});