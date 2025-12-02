import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function Esqueci_senha({ navigation }: any) {

  const [telefone, settelefone] = useState("");
  const [informar, setinformar] = useState("");

  const Iniciar_sessao = async () => {
    try {
      const response1 = await axios.get("http://192.168.1.220:3000/MindCare/API/credencia");
      const credencias = response1.data;
      const credencia = credencias.find(
          (u: { telefone: string; senha: string }) =>
          u.telefone === telefone
      );

      const gerarcodigo = (tamanho = 6) => {
        const caracteres = "123456789";
        let codigo = "";
        for (let i = 0; i < tamanho; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres.charAt(indice);
        }
        return codigo;
      };
      const codigo = gerarcodigo();

      if (telefone === "") {
        setinformar("Preencha todos os campos, por favor");
      } else if (!credencia) {
        setinformar("Nenhum usuario resistrado com esse Telefone.");
      } else if(credencia){
        const usuario = await axios.get(`http://192.168.1.220:3000/MindCare/API/usuario/${credencia.id}`);
        const telefone_completo = `+244${telefone}`
        await axios.post(`http://192.168.1.220:3000/MindCare/API/enviar-sms`, {
            nome: usuario.data.nome,
            telefone: telefone_completo,
            codigo,
        });
        navigation.navigate("Verificar_usuario",{
          codigo,
          telefone: credencia.telefone,
        })
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
          <Text style={styles.Titulo}>Esqueceu a senha?</Text>
        </View>

        {/* Corpo */}
        <View style={styles.Corpo}>
        <Text style={[styles.Texto, {fontSize: scale(13), textAlign: 'center', marginBottom: scale(20)}]}>Digite o numero de Telefone para confirmar usuario</Text>
          <Text style={styles.Texto}>Telefone</Text>
          <TextInput
            style={styles.Caixa_de_texto}
            placeholder="999..."
            inputMode="numeric"
            value={telefone}
            onChangeText={settelefone}
          />

          <Text style={styles.Informar}>{informar}</Text>

          {/* Rodapé */}
          <TouchableOpacity style={styles.Botao} onPress={() => Iniciar_sessao()}>
            <Text style={styles.BotaoTexto}>Buscar</Text>
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
  Caixa_de_texto: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: scale(10),
    fontSize: scale(18),
    paddingVertical: scale(12),
    paddingHorizontal: scale(15),
    marginBottom: scale(10),
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