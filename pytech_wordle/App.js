import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

// Objeto que mapeia cada palavra a uma explicação
const dicasPython = {
  function: 'Um bloco de código que é executado quando é chamado',
  parametro: 'Variáveis ​​usadas para receber valores de uma função',
  return: 'Valor que uma função retorna após ser chamada',
  chamada: 'Ato de executar uma função',
  definicao: 'A especificação dos parâmetros e do comportamento de uma função',
  argumento: 'Valores fornecidos a uma função quando ela é chamada',
  escopo: 'O contexto em que as variáveis existem e podem ser acessadas',
  lambda: 'Funções anônimas definidas sem nome',
  builtin: 'Funções incorporadas disponíveis em Python sem a necessidade de importações',
  recursao: 'O conceito de uma função chamando a si mesma',
};

// Lista de palavras relacionadas a funções em Python
const palavrasPython = Object.keys(dicasPython);

export default function App() {
  const [palavraSecreta, setPalavraSecreta] = useState('');
  const [tentativa, setTentativa] = useState('');
  const [tentativasRestantes, setTentativasRestantes] = useState(3);

  useEffect(() => {
    reiniciarJogo();
  }, []);

  function gerarPalavraSecreta() {
    return palavrasPython[Math.floor(Math.random() * palavrasPython.length)];
  }

  function reiniciarJogo() {
    setPalavraSecreta(gerarPalavraSecreta());
    setTentativa('');
    setTentativasRestantes(3);
  }

  function verificarPalavra() {
    let dicas = '';
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (tentativa[i] === palavraSecreta[i]) {
        dicas += tentativa[i].toUpperCase();
      } else if (palavraSecreta.includes(tentativa[i])) {
        dicas += '*';
      } else {
        dicas += '-';
      }
    }
    return dicas;
  }

  function handleGuess() {
    const resultado = verificarPalavra();
    if (resultado === palavraSecreta.toUpperCase()) {
      Alert.alert('Parabéns!', `Você acertou a palavra!\nDica: ${dicasPython[palavraSecreta]}`);
      reiniciarJogo();
    } else {
      setTentativasRestantes(tentativasRestantes - 1);
      if (tentativasRestantes === 0) {
        Alert.alert('Fim do Jogo', `Você perdeu! A palavra correta era: ${palavraSecreta}`);
        reiniciarJogo();
      } else if (tentativasRestantes === 1) {
        Alert.alert('Atenção!', `Última tentativa! Dica: ${dicasPython[palavraSecreta]}`);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> PYTECH</Text>
      <Text style={styles.subtitle}>Você tem que adivinhar uma palavra relacionada a funções em Python.</Text>
      <Text style={styles.subtitle}>A palavra tem {palavraSecreta.length} letras.</Text>
      <Text style={styles.subtitle}>Tentativas restantes: {tentativasRestantes}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setTentativa(text)}
        value={tentativa}
        placeholder="Digite sua tentativa"
        maxLength={palavraSecreta.length}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleGuess}
      >
        <Text style={styles.buttonText}>Tentar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6A5ACD',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: '#6A5ACD',
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6A5ACD',
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
