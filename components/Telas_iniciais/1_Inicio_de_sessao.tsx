import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

export default function Inicio_de_sessao({navigation}: any){
  const [mostra, setmostra] = useState(true);
  const olho: keyof typeof Ionicons.glyphMap = mostra ? 'eye-off-outline' : 'eye-outline'

  //login
  const [telefone, settelefone] = useState("");
  const [password, setPassword] = useState("");
  const [informar, setinformar] = useState("");

  const Iniciar_sessao = async ()=> {
    try {
      const response = await axios.get("https://mindcare-api.onrender.com/MindCare/API/usuario");
      const usuarios = response.data;
      const usuario = usuarios.find((u: { telefone: string; password: string; }) => u.telefone === telefone && u.password === password);

      if(telefone === "" || password === ""){
        setinformar("Preencha todos os campos, por favor");
      }else if (!usuario) {
        setinformar("Telefone ou senha incorretos.");
      }

    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      alert('n funcionou')
    }
  }


    return(
        <SafeAreaProvider>
              <SafeAreaView style={styles.Container} edges={["top"]}>
                {/* Cabeçalho */}
                <View style={styles.Cabecario}>
                  <Text style={styles.Titulo}>Iniciar Sessao</Text>
                </View>
        
                {/* Corpo */}
                <View style={styles.corpo}>
                  <Text style={styles.Texto}>Telefone</Text>
                  <TextInput style={styles.Caixa_de_texto} placeholder="999..." inputMode="numeric" value={telefone} onChangeText={settelefone}/>
                  <Text style={styles.Texto}>Senha</Text>
                  <View style={{width: "90%", height: "10%", flexDirection: "row", alignSelf: 'center'}}>
                    <TextInput style={[styles.Caixa_de_texto, {height: "100%", width: "75%", marginRight: "5%"}]} placeholder="***..." secureTextEntry={mostra} value={password} onChangeText={setPassword}/>
                    <TouchableOpacity style={styles.mostrar} onPress={() => setmostra(!mostra)}>
                      <Ionicons name={olho} size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <Text style={{marginLeft: "5%", color: "red"}}>{informar}</Text>
        
                  {/* Rodapé */}
                  <TouchableOpacity style={styles.Botao} onPress={()=> Iniciar_sessao()}>
                    <Text style={styles.botao_texto}>Iniciar</Text>
                  </TouchableOpacity>
                  <Text style={styles.aviso}>esqueci a senha!</Text>
                  <Text style={[styles.aviso, {alignSelf: 'center', marginTop: "20%"}]} onPress={() => navigation.navigate("Criar_conta")}>Nao tenhuma uma conta! Criar Conta.</Text>
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
    height: "20%",
    backgroundColor: "#730FB0",
    alignItems: "center",
    justifyContent: "center",
  },
  Titulo: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    alignItems: "center",
  },
  corpo: {
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  Texto: {
    textAlign: "left",
    fontSize: 20,
    color: "#730FB0",
    marginVertical: 5,
    marginHorizontal: "5%",
    marginTop: 15,
  },
  Caixa_de_texto: {
    width: "90%",
    height: "10%",
    alignSelf: 'center',
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    fontSize: 20,
    padding: 15,
    marginVertical: 10,
  },
  mostrar: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Botao: {
    width: "90%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#730FB0",
    marginTop: "5%",
    borderRadius: 10,
    alignSelf: 'center',
  },
  botao_texto: {
    color: "#fff",
    fontSize: 20,
  },
  aviso: {
    textAlign: "left",
    fontSize: 15,
    color: "#730FB0",
    marginVertical: 5,
    marginHorizontal: "5%",
    marginTop: 10,
  }
});