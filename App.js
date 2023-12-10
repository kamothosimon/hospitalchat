import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const userMessage = inputText.trim().toLowerCase();
      let responseMessage = '';
  
      if (userMessage.match(/hello|hi|hey/)) {
        responseMessage = `Hello! Welcome to Kijabe Hospital. How can we assist you today?`;
      } else if (userMessage.match(/appointment/)) {
        responseMessage = `To make an appointment, please call our appointment hotline at or visit our website at www.kijabehospital.com/appointments`;
      } else if (userMessage.match(/visiting hours/)) {
        responseMessage = `Our visiting hours are from 10 AM to 8 PM, Monday to Sunday. Please note that visiting hours may vary for different wards and departments.`;
      } else {
        responseMessage = `Sorry, I couldn't understand your message. Please contact  us.`;
      }
  
      const userMessageObject = { text: inputText, sender: 'user' };
      const responseMessageObject = { text: responseMessage, sender: 'bot' };
  
      setMessages([...messages, userMessageObject, responseMessageObject]);
      setInputText('');
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userMessageBubble : styles.botMessageBubble,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageBubble: {
    backgroundColor: '#e2f9ff',
    borderRadius: 8,
    padding: 8,
  },
  userMessageBubble: {
    alignSelf: 'flex-end',
  },
  botMessageBubble: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});