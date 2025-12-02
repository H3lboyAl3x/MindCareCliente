import { useState } from "react";
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Platform,Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function Criar_conta({ navigation }: any) {
  const [primeiro_nome, setprimeiro_nome] = useState("");
  const [segundo_nome, setsegundo_nome] = useState("");
  const [data_de_nascimento, setdata_de_nascimento] = useState(new Date());
  const [show, setShow] = useState(false);
  const [genero, setGenero] = useState("");
  const [telefone, settelefone] = useState("");
  const [informar, setinformar] = useState("");

  const criar_conta = async () => {
    if (primeiro_nome === "" || segundo_nome === "" || genero === "" || telefone === "") {
      setinformar("Preencha todos os campos, por favor");
      return;
    }

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

    try {
      const telefone_completo = `+244${telefone}`
      await axios.post(`http://192.168.1.220:3000/MindCare/API/enviar-sms`, {
        nome: primeiro_nome,
        telefone: telefone_completo,
        codigo,
      });
      const nome_completo = `${primeiro_nome} ${segundo_nome}`;
      navigation.navigate("Confirmar_telefone", {
        nome_completo,
        data_de_nascimento,
        genero,
        telefone,
        codigo,
      });
    } catch (error) {
      alert("Erro ao enviar SMS");
    }
  };

  const onChange = (_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || data_de_nascimento;
    setShow(Platform.OS === "ios");
    setdata_de_nascimento(currentDate);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.Container} edges={["top"]}>
        {/* Cabeçalho */}
        <View style={styles.Cabecario}>
          <Text style={styles.Titulo}>Criar conta</Text>
        </View>

        {/* Corpo */}
        <View style={styles.Corpo}>
          {/* Nome e sobrenome */}
          <View style={styles.NomeContainer}>
            <View style={styles.CampoNome}>
              <Text style={styles.Texto}>Nome</Text>
              <TextInput
                style={styles.CaixaNome}
                placeholder="A..."
                value={primeiro_nome}
                onChangeText={setprimeiro_nome}
              />
            </View>

            <View style={styles.CampoNome}>
              <Text style={styles.Texto}>Sobrenome</Text>
              <TextInput
                style={styles.CaixaNome}
                placeholder="B..."
                value={segundo_nome}
                onChangeText={setsegundo_nome}
              />
            </View>
          </View>

          {/* Data de nascimento */}
          <Text style={styles.Texto}>Data de nascimento</Text>
          <TouchableOpacity style={styles.BotaoData} onPress={() => setShow(true)}>
            <TextInput
              placeholder="MM/DD/AAAA"
              value={data_de_nascimento.toLocaleDateString()}
              editable={false}
              style={styles.Caixa_de_texto}
            />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={data_de_nascimento}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          {/* Gênero */}
          <Text style={styles.Texto}>Gênero</Text>
          <View style={styles.PickerContainer}>
            <Picker selectedValue={genero} onValueChange={(itemValue) => setGenero(itemValue)}>
              <Picker.Item label="M/F..." value="" />
              <Picker.Item label="Masculino" value="masculino" />
              <Picker.Item label="Feminino" value="feminino" />
              <Picker.Item label="Outro" value="outro" />
            </Picker>
          </View>

          {/* Telefone */}
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
          <TouchableOpacity style={styles.Botao} onPress={() => criar_conta()}>
            <Text style={styles.BotaoTexto}>Iniciar</Text>
          </TouchableOpacity>

          <Text style={styles.Aviso} onPress={() => navigation.navigate("Inicio_de_sessao")}>
            Já tenho uma conta, iniciar sessão.
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
  NomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(10),
  },
  CampoNome: {
    width: "47%",
  },
  Texto: {
    fontSize: scale(16),
    color: "#730FB0",
    marginBottom: scale(5),
  },
  CaixaNome: {
    backgroundColor: "#D9D9D9",
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    fontSize: scale(16),
  },
  Caixa_de_texto: {
    backgroundColor: "#D9D9D9",
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    fontSize: scale(16),
    marginBottom: scale(10),
  },
  PickerContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: scale(10),
    marginBottom: scale(10),
    overflow: "hidden",
  },
  BotaoData: {
    width: "100%",
    marginBottom: scale(10),
  },
  Informar: {
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
    marginTop: scale(5),
  },
  BotaoTexto: {
    color: "#fff",
    fontSize: scale(20),
    fontWeight: "600",
  },
  Aviso: {
    fontSize: scale(15),
    color: "#730FB0",
    marginTop: scale(20),
    textAlign: "center",
  },
});