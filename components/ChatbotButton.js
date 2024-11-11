import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const ChatbotComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = "AIzaSyDwQl6jSbxjPLH-sMrbY6IXua2PwsVz2K4";

  useEffect(() => {
    const startChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "Hello!";
        const result = await model.generateContent(prompt);
        const text = result.response.text;

        showMessage({
          message: "Welcome to Bus Tracking Chat 🤖",
          description: text,
          type: "info",
          icon: "info",
          duration: 2000,
        });
        setMessages([{ text, user: false }]);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };
    startChat();
  }, []);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
  
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");
    setIsLoading(true);
  
    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      const prompt =
        messages
          .map((m) => (m.user ? `User: ${m.text}` : `Bot: ${m.text}`))
          .join("\n") + `\nUser: ${userMessage.text}\nBot:`;
  
      console.log("Prompt sent to API:", prompt);
  
      // Adjusting the API call based on expected structure
      const result = await model.generateContent({ input: { text: prompt } }); 
      console.log("API Response:", result);
  
      // Accessing the response text, ensure it's the correct path
      const text = result?.output?.text || "Sorry, I couldn't process that.";
  
      setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
    } catch (error) {
      console.error("Error sending message:", error);
      showMessage({
        message: "Error",
        description: "There was an issue with the chatbot response. Please try again.",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const quickReply = (text) => {
    setUserInput(text);
    sendMessage();
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="comments" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setMessages([]);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderText}>Chat with Gemini</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setMessages([]);
                }}
              >
                <FontAwesome name="times" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item, index) => index.toString()}
              inverted
              style={styles.messageList}
            />

            {isLoading && (
              <View style={styles.loadingIndicator}>
                <Text>Bot is typing...</Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Type a message"
                onChangeText={setUserInput}
                value={userInput}
                onSubmitEditing={sendMessage}
                style={styles.input}
                placeholderTextColor="#fff"
              />

              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <FontAwesome name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.quickReplyContainer}>
              <TouchableOpacity
                style={styles.quickReplyButton}
                onPress={() => quickReply("Help")}
              >
                <Text style={styles.quickReplyText}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickReplyButton}
                onPress={() => quickReply("Order Status")}
              >
                <Text style={styles.quickReplyText}>Order Status</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickReplyButton}
                onPress={() => quickReply("Product Info")}
              >
                <Text style={styles.quickReplyText}>Product Info</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlashMessage position="top" />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  chatbotButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007BFF",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  chatContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 10,
    height: 50,
    color: "white",
    marginRight: 5,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  loadingIndicator: {
    alignItems: "center",
    marginVertical: 5,
  },
  quickReplyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  quickReplyButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  quickReplyText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatbotComponent;
