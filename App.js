import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Button, Image, TouchableOpacity, FlatList } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [photos, setPhotos] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ title: "", date: "" });

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, date: new Date() }]);
    setNewMessage("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, { uri: result.assets[0].uri }]);
    }
  };

  const addAppointment = () => {
    if (!newAppointment.title || !newAppointment.date) return;
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ title: "", date: "" });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
      <Text style={{ fontSize: 28, color: "#f00", fontWeight: "bold", marginBottom: 16 }}>🎸 De Kerelties App 🤘</Text>

      {/* Chat */}
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 8 }}>💬 Chat</Text>
      <ScrollView style={{ maxHeight: 150, marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <View key={index} style={{ backgroundColor: "#222", padding: 8, marginBottom: 4, borderRadius: 6 }}>
            <Text style={{ color: "#888", fontSize: 12 }}>{msg.date.toLocaleTimeString()}:</Text>
            <Text style={{ color: "#fff" }}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={{ flex: 1, backgroundColor: "#444", color: "#fff", padding: 8, borderRadius: 6 }}
          placeholder="Typ je wijsheid hier..."
          placeholderTextColor="#aaa"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title="Verstuur" onPress={sendMessage} color="#e11d48" />
      </View>

      {/* Foto's */}
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 8 }}>📸 Foto's</Text>
      <Button title="Upload een foto" onPress={pickImage} color="#e11d48" />
      <ScrollView horizontal style={{ marginVertical: 10 }}>
        {photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo.uri }} style={{ width: 100, height: 100, marginRight: 10 }} />
        ))}
      </ScrollView>

      {/* Afspraken */}
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 8 }}>🗓️ Afspraken</Text>
      <TextInput
        placeholder="Titel van de afspraak"
        placeholderTextColor="#aaa"
        style={{ backgroundColor: "#444", color: "#fff", padding: 8, marginBottom: 8, borderRadius: 6 }}
        value={newAppointment.title}
        onChangeText={(text) => setNewAppointment({ ...newAppointment, title: text })}
      />
      <TextInput
        placeholder="Datum en tijd (bijv. 2025-03-28 20:00)"
        placeholderTextColor="#aaa"
        style={{ backgroundColor: "#444", color: "#fff", padding: 8, marginBottom: 8, borderRadius: 6 }}
        value={newAppointment.date}
        onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
      />
      <Button title="Toevoegen" onPress={addAppointment} color="#e11d48" />
      <FlatList
        data={appointments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#222", padding: 8, marginVertical: 4, borderRadius: 6 }}>
            <Text style={{ color: "#fff" }}>{item.title} - {item.date}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
