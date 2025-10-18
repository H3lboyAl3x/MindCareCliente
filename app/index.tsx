import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importacao das telas
import Tela_inicial from '@/components/Telas_iniciais/2_Tela_inicial';
import Inicio_de_sessao from '@/components/Telas_iniciais/1_Inicio_de_sessao';
import Criar_conta from '@/components/Telas_iniciais/3_Criar_conta';
import Confirmar_telefone from '@/components/Telas_iniciais/Confirmar_telefone';

const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Confirmar_telefone" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tela_inicial" component={Tela_inicial} />
      <Stack.Screen name="Inicio_de_sessao" component={Inicio_de_sessao}/>
      <Stack.Screen name="Criar_conta" component={Criar_conta}/>
      <Stack.Screen name="Confirmar_telefone" component={Confirmar_telefone}/>
    </Stack.Navigator>
  )
}