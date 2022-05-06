import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#293241',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#ee6c4d',
    fontSize: 24,
    fontWeight: '600'
  }
});
