import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VerificationScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerification = () => {
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Code</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="md-lock-closed" size={24} color="#BFBFBF" />
        <TextInput
          style={styles.input}
          placeholder="Enter code"
          onChangeText={(text) => setVerificationCode(text)}
          value={verificationCode}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify</Text>
        <Ionicons name="md-arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default VerificationScreen;
