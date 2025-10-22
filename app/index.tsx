import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importacao das telas
import Tela_inicial from '@/components/1_Telas_iniciais/1_Tela_inicial';
import Inicio_de_sessao from '@/components/1_Telas_iniciais/2_Inicio_de_sessao';
import Criar_conta from '@/components/1_Telas_iniciais/3_Criar_conta';
import Confirmar_telefone from '@/components/1_Telas_iniciais/4_Confirmar_telefone';
import Finalizar_Cadastro from '@/components/1_Telas_iniciais/5_Finilizar_cadastro';

const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Tela_inicial" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tela_inicial" component={Tela_inicial} />
      <Stack.Screen name="Inicio_de_sessao" component={Inicio_de_sessao}/>
      <Stack.Screen name="Criar_conta" component={Criar_conta}/>
      <Stack.Screen name="Confirmar_telefone" component={Confirmar_telefone}/>
      <Stack.Screen name="Finalizar_Cadastro" component={Finalizar_Cadastro}/>
    </Stack.Navigator>
  )
}