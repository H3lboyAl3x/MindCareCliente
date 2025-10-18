import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

export default function Criar_conta({navigation}: any){
    const [mostra, setmostra] = useState(true);

    //login
    const [primeiro_nome, setprimeiro_nome] = useState("");
    const [segundo_nome, setsegundo_nome] = useState("");
    const [data_de_nascimento, setdata_de_nascimento] = useState(new Date);
    const [show, setShow] = useState(false);
    const [genero, setGenero] = useState('');
    const [telefone, settelefone] = useState("");
    const [informar, setinformar] = useState("");

    const criar_conta = async () => {
        if(primeiro_nome === "" || segundo_nome === "" || genero === "" || telefone === ""){
            setinformar("Preencha todos os campos, por favor")
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
        try{
            const response = await axios.post(`https://mindcare-api.onrender.com/MindCare/API/enviar-sms`, {
                telefone,
                codigo
            });
            const nome_completo = primeiro_nome + segundo_nome
            navigation.navigate("Confirmar_telefone", {nome_completo, data_de_nascimento, genero, telefone, codigo})
        }catch (error)
        {
            alert("erro a enviar sms")
        }
    }

  const onChange = (_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || data_de_nascimento;
    setShow(Platform.OS === 'ios');
    setdata_de_nascimento(currentDate);
  };

    return(
        <SafeAreaProvider>
                <SafeAreaView style={styles.Container} edges={["top"]}>
                    {/* Cabeçalho */}
                    <View style={styles.Cabecario}>
                        <Text style={styles.Titulo}>Criar conta</Text>
                    </View>

                    {/* Corpo */}
                    <View style={styles.corpo}>
                        <View style={styles.nome}>
                            <View style={{width: '45%', marginRight: '10%'}}>
                                <Text style={styles.Texto}>Nome</Text>
                                <TextInput style={[styles.Caixa_de_texto, {height: "50%", width: "100%"}]} placeholder="A..." value={primeiro_nome} onChangeText={setprimeiro_nome}/>
                            </View>
                            <View style={{width: '45%'}}>
                                <Text style={styles.Texto}>Sobrenome</Text>
                                <TextInput style={[styles.Caixa_de_texto, {height: "50%", width: "100%"}]} placeholder="B..." value={segundo_nome} onChangeText={setsegundo_nome}/>
                            </View>
                        </View>
                        <Text style={styles.Texto}>Data de nascimento</Text>
                        <TouchableOpacity style={{width: "100%", height: "10%"}} onPress={() => setShow(true)}>
                            <TextInput placeholder="MM/DD/AAAA" value={data_de_nascimento.toLocaleDateString()} editable={false} style={[styles.Caixa_de_texto, {height: "100%"}]}/>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                value={data_de_nascimento}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                        )}
                        <Text style={styles.Texto}>Genero</Text>
                        <View style={[styles.Caixa_de_texto, { justifyContent:'center'}]}>
                            <Picker selectedValue={genero} onValueChange={(itemValue) => setGenero(itemValue)}>
                                <Picker.Item label="M/F..." value="" />
                                <Picker.Item label="Masculino" value="masculino" />
                                <Picker.Item label="Feminino" value="feminino" />
                                <Picker.Item label="Outro" value="outro" />
                            </Picker>
                        </View>

                        <Text style={styles.Texto}>Telefone</Text>
                        <TextInput style={styles.Caixa_de_texto} placeholder="999..." inputMode="numeric" value={telefone} onChangeText={settelefone}/>
                        <Text style={{marginLeft: "5%", color: "red"}}>{informar}</Text>

                        {/* Rodapé */}
                        <TouchableOpacity style={styles.Botao} onPress={() => criar_conta()}>
                            <Text style={styles.botao_texto}>Iniciar</Text>
                        </TouchableOpacity>
                        <Text style={styles.aviso} onPress={() => navigation.navigate("Inicio_de_sessao")}>Ja tenho uma conta, iniciar sessao.</Text>
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
    fontSize: 40,
    fontWeight: "bold",
    alignItems: "center",
  },
  corpo: {
    width: "100%",
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  nome: {
    width: "90%",
    height: "20%",
    flexDirection: "row",
    alignSelf: 'center',
    marginTop: 5,
  },
  Texto: {
    textAlign: "left",
    fontSize: 18,
    color: "#730FB0",
    marginHorizontal: "5%",
    marginTop: 5,
  },
  Caixa_de_texto: {
    width: "90%",
    height: "10%",
    alignSelf: 'center',
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    fontSize: 18,
    padding: 15,
    marginVertical: 2,
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
    marginTop: 10,
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
    marginTop: 10,
    alignSelf: "center",
  }
});