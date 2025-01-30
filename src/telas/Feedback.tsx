import type React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const FeedbackScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendFeedback = async () => {
    if (!message.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o campo de mensagem.');
      return;
    }

    const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfktpFzZarT_AlUJjdPZFe4qxE8vh0Ba25ARvby_AZUvzGJeA/formResponse';
    const formData = new URLSearchParams();
    formData.append('entry.1642770719', name); // ID do campo "Nome"
    formData.append('entry.1920178706', email); // ID do campo "Email"
    formData.append('entry.2118205607', message); // ID do campo "Mensagem"

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        Alert.alert('Obrigado!', 'Seu feedback foi enviado com sucesso.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        Alert.alert('Erro', 'Não foi possível enviar seu feedback. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      Alert.alert('Erro', 'Houve um problema ao enviar seu feedback.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envie seu Feedback</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu Nome (opcional)"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu Email (opcional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escreva sua mensagem"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
        <Text style={styles.buttonText}>Enviar Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
