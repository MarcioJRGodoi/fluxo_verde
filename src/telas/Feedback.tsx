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
    formData.append('entry.1642770719', name);
    formData.append('entry.1920178706', email);
    formData.append('entry.2118205607', message);

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
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        style={styles.input}
        placeholder="Seu Email (opcional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escreva sua mensagem"
        value={message}
        onChangeText={setMessage}
        multiline
        placeholderTextColor="#A0A0A0"
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
    backgroundColor: '#E7F6EF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E7C58',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E7C58',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1E7C58',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
