import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importacao das telas
import Tela_inicial from '@/components/Telas_iniciais/Tela_inicial';
import Inicio_de_sessao from '@/components/Telas_iniciais/Inicio_de_sessao';

const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Tela_inicial" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tela_inicial" component={Tela_inicial} />
      <Stack.Screen name="Inicio_de_sessao" component={Inicio_de_sessao}/>
    </Stack.Navigator>
  )
}