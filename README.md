import React, { useState } from "react";

export default function KereltiesApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [photos, setPhotos] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ title: "", date: "" });

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, date: new Date() }]);
    setNewMessage("");
  };

  const uploadPhoto = () => {
    if (newPhoto) {
      const url = URL.createObjectURL(newPhoto);
      setPhotos([...photos, { url, name: newPhoto.name }]);
      setNewPhoto(null);
    }
  };

  const addAppointment = () => {
    if (!newAppointment.title || !newAppointment.date) return;
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ title: "", date: "" });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", padding: 20, fontFamily: "monospace" }}>
      <h1 style={{ fontSize: 36, fontWeight: "bold", marginBottom: 20, color: "#f00" }}>🎸 De Kerelties App 🤘</h1>

      {/* Chat Section */}
      <section style={{ backgroundColor: "#111", padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <h2 style={{ fontSize: 24 }}>💬 Chat</h2>
        <div style={{ maxHeight: 200, overflowY: "auto", marginTop: 8, marginBottom: 16 }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ backgroundColor: "#222", padding: 8, borderRadius: 4, marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: "#888" }}>{msg.date.toLocaleTimeString()}:</div>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Typ je wijsheid hier..."
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={sendMessage} style={{ backgroundColor: "#c00", color: "#fff", padding: "8px 16px" }}>
            Verstuur
          </button>
        </div>
      </section>

      {/* Foto's Upload */}
      <section style={{ backgroundColor: "#111", padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <h2 style={{ fontSize: 24 }}>📸 Foto's</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewPhoto(e.target.files[0])}
          style={{ marginTop: 8, marginBottom: 8 }}
        />
        <button onClick={uploadPhoto} style={{ backgroundColor: "#c00", color: "#fff", padding: "8px 16px", marginBottom: 16 }}>
          Upload
        </button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {photos.map((photo, index) => (
            <img key={index} src={photo.url} alt={photo.name} style={{ width: 100, borderRadius: 4 }} />
          ))}
        </div>
      </section>

      {/* Afspraken Planner */}
      <section style={{ backgroundColor: "#111", padding: 16, borderRadius: 8 }}>
        <h2 style={{ fontSize: 24 }}>🗓️ Afspraken</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          <input
            value={newAppointment.title}
            onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
            placeholder="Titel van de afspraak"
            style={{ padding: 8 }}
          />
          <input
            type="datetime-local"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            style={{ padding: 8 }}
          />
          <button onClick={addAppointment} style={{ backgroundColor: "#c00", color: "#fff", padding: "8px 16px" }}>
            Toevoegen
          </button>
        </div>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {appointments.map((appt, index) => (
            <li key={index} style={{ backgroundColor: "#222", padding: 8, borderRadius: 4, marginBottom: 8 }}>
              <strong>{appt.title}</strong> - {new Date(appt.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
