import { StyleSheet, View } from 'react-native';
import Title from './src/components/Title';
import Form from './src/components/Form/index';

export default function App() {
  return (
    <View style={styles.container}>
      <Title/> 
      <Form/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, /* usar 100% da tela */
    backgroundColor: '#e0e5e5',
    paddingTop: 80
  },
});
