import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

export default function Tela_inicial({navigation}: any) {
  const [analise, setanalise] = useState(1);
  const [titulo, settitulo] = useState("");
  const [texto, settexto] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      setanalise(prev => (prev === 3 ? 1 : prev + 1));
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (analise === 1) {
      settitulo("A tua saúde mental é uma prioridade");
      settexto("Cuida de ti com o apoio que mereces, no teu tempo e no teu espaço.");
    } else if (analise === 2) {
      settitulo("Conecta-te com profissionais qualificados");
      settexto("Psicólogos disponíveis para te ouvir e ajudar, com total privacidade e confiança.");
    } else if (analise === 3) {
      settitulo("Bem-estar emocional ao teu alcance");
      settexto("Marca consultas, acompanha o teu progresso e sente-te acolhido em cada etapa.");
    }
  }, [analise]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.Container} edges={["top"]}>
        {/* Cabeçalho */}
        <View style={styles.Cabecario}>
          <Text style={styles.Titulo}>Bem-Vindo</Text>
        </View>

        {/* Corpo */}
        <View style={styles.corpo}>
          <Image style={styles.Imagem} source={require("../../assets/images/icon_mindcare.jpg")}/>
          <Text style={[styles.Texto, { fontSize: 17, fontWeight: "bold" }]}>{titulo}</Text>
          <Text style={styles.Texto}>{texto}</Text>

          {/* Rodapé */}
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={[styles.Progresso,{ backgroundColor: analise === 1 ? "#730FB0" : "#AAAAAA" },]}/>
            <View style={[styles.Progresso,{ backgroundColor: analise === 2 ? "#730FB0" : "#AAAAAA" },]}/>
            <View style={[styles.Progresso,{ backgroundColor: analise === 3 ? "#730FB0" : "#AAAAAA" },]}/>
          </View>
          <TouchableOpacity style={styles.Botao} onPress={() => navigation.navigate("Inicio_de_sessao")}>
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
    backgroundColor: "#fff",
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
    alignItems: "center",
    justifyContent: "center",
  },
  Imagem: {
    width: "70%",
    height: "45%",
  },
  Texto: {
    textAlign: "center",
    fontSize: 15,
    color: "#730FB0",
    marginVertical: 5,
  },
  Progresso: {
    width: 15,
    height: 15,
    borderRadius: 25,
    backgroundColor: "#AAAAAA",
    marginHorizontal: 5,
  },
  Botao: {
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#730FB0",
    marginTop: 5,
    borderRadius: 10,
  },
  botao_texto: {
    color: "#fff",
    fontSize: 25,
  },
});