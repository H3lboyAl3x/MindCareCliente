import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");

// Função para escalar fonte e elementos proporcionalmente à largura da tela
const scale = (size: number) => (width / 375) * size;

export default function Tela_inicial({ navigation }: any) {
  const [analise, setAnalise] = useState(1);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAnalise((prev) => (prev === 3 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (analise === 1) {
      setTitulo("A tua saúde mental é uma prioridade");
      setTexto("Cuida de ti com o apoio que mereces, no teu tempo e no teu espaço.");
    } else if (analise === 2) {
      setTitulo("Conecta-te com profissionais qualificados");
      setTexto("Psicólogos disponíveis para te ouvir e ajudar, com total privacidade e confiança.");
    } else if (analise === 3) {
      setTitulo("Bem-estar emocional ao teu alcance");
      setTexto("Marca consultas, acompanha o teu progresso e sente-te acolhido em cada etapa.");
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
        <View style={styles.Corpo}>
          <Image
            style={styles.Imagem}
            resizeMode="contain"
            source={require("../../assets/images/icon_mindcare.jpg")}
          />

          <Text style={[styles.Texto, styles.TextoTitulo]}>{titulo}</Text>
          <Text style={styles.Texto}>{texto}</Text>

          {/* Indicadores de progresso */}
          <View style={styles.ProgressoContainer}>
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.Progresso,
                  { backgroundColor: analise === i ? "#730FB0" : "#AAAAAA" },
                ]}
              />
            ))}
          </View>

          {/* Botão */}
          <TouchableOpacity
            style={styles.Botao}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Inicio_de_sessao")}
          >
            <Text style={styles.BotaoTexto}>Iniciar</Text>
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
    flex: 0.25,
    backgroundColor: "#730FB0",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(20),
  },
  Imagem: {
    width: "70%",
    height: height * 0.3,
    marginBottom: scale(15),
  },
  Texto: {
    textAlign: "center",
    fontSize: scale(15),
    color: "#730FB0",
    marginVertical: scale(5),
  },
  TextoTitulo: {
    fontWeight: "bold",
    fontSize: scale(17),
  },
  ProgressoContainer: {
    flexDirection: "row",
    marginVertical: scale(10),
  },
  Progresso: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(10),
    marginHorizontal: scale(5),
  },
  Botao: {
    width: "80%",
    paddingVertical: scale(12),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#730FB0",
    borderRadius: scale(10),
    marginTop: scale(10),
  },
  BotaoTexto: {
    color: "#fff",
    fontSize: scale(20),
    fontWeight: "600",
  },
});