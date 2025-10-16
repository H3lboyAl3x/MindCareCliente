import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Inicio_de_sessao({navigation}){
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
                  <TextInput style={styles.Caixa_de_texto} placeholder="999"/>
                  <Text style={styles.Texto}>Senha</Text>
                  <TextInput style={styles.Caixa_de_texto} placeholder="***..."/>
        
                  {/* Rodapé */}
                  <TouchableOpacity style={styles.Botao}>
                    <Text style={styles.botao_texto}>Iniciar</Text>
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
    fontSize: 18,
    color: "#730FB0",
    marginVertical: 5,
    marginHorizontal: "10%",
    marginTop: 20,
  },
  Caixa_de_texto: {
    width: "80%",
    height: "10%",
    alignSelf: 'center',
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    fontSize: 19,
    padding: 10,
    marginVertical: 20,
  },
  Botao: {
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#730FB0",
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  botao_texto: {
    color: "#fff",
    fontSize: 20,
  },
});