import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function Inicio_de_sessao({ navigation }: any) {
  const [mostra, setmostra] = useState(true);
  const olho: keyof typeof Ionicons.glyphMap = mostra ? "eye-off-outline" : "eye-outline";

  // login
  const [telefone, settelefone] = useState("");
  const [senha, setsenha] = useState("");
  const [informar, setinformar] = useState("");

  const Iniciar_sessao = async () => {
    try {
      const response1 = await axios.get("https://mindcare-api.onrender.com/MindCare/API/credencia");
      const credencias = response1.data;
      const credencia = credencias.find(
          (u: { telefone: string; senha: string }) =>
          u.telefone === telefone && u.senha === senha
      );

      if (telefone === "" || senha === "") {
        setinformar("Preencha todos os campos, por favor");
      } else if (!credencia) {
        setinformar("Telefone ou senha incorretos.");
      } else if(credencia)
      {
        const usuario = await axios.get(`https://mindcare-api.onrender.com/MindCare/API/usuario/${credencia.id}`);
        //codigo para trocar de tela
      }

      
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      alert("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.Container} edges={["top"]}>
        {/* Cabeçalho */}
        <View style={styles.Cabecario}>
          <Text style={styles.Titulo}>Iniciar Sessão</Text>
        </View>

        {/* Corpo */}
        <View style={styles.Corpo}>
          <Text style={styles.Texto}>Telefone</Text>
          <TextInput
            style={styles.Caixa_de_texto}
            placeholder="999..."
            inputMode="numeric"
            value={telefone}
            onChangeText={settelefone}
          />

          <Text style={styles.Texto}>Senha</Text>
          <View style={styles.SenhaContainer}>
            <TextInput
              style={styles.CaixaSenha}
              placeholder="***..."
              secureTextEntry={mostra}
              value={senha}
              onChangeText={setsenha}
            />
            <TouchableOpacity style={styles.Mostrar} onPress={() => setmostra(!mostra)}>
              <Ionicons name={olho} size={scale(24)} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.Informar}>{informar}</Text>

          {/* Rodapé */}
          <TouchableOpacity style={styles.Botao} onPress={() => Iniciar_sessao()}>
            <Text style={styles.BotaoTexto}>Iniciar</Text>
          </TouchableOpacity>

          <Text style={styles.Aviso}>Esqueci a senha!</Text>

          <Text
            style={styles.CriarConta}
            onPress={() => navigation.navigate("Criar_conta")}
          >
            Não tem uma conta? Criar conta.
          </Text>
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
  Caixa_de_texto: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: scale(10),
    fontSize: scale(18),
    paddingVertical: scale(12),
    paddingHorizontal: scale(15),
    marginBottom: scale(10),
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
  Aviso: {
    fontSize: scale(15),
    color: "#730FB0",
    marginTop: scale(10),
  },
  CriarConta: {
    fontSize: scale(15),
    color: "#730FB0",
    alignSelf: "center",
    marginTop: scale(60),
    textDecorationLine: "underline",
  },
});