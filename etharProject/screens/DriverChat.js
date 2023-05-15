import React, { useState, useEffect, useCallback,useContext } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble as Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/auth';
import axios from 'axios'
import { withNavigation } from 'react-navigation';
import io from 'socket.io-client';
import PushNotification from 'react-native-push-notification';

const DriverChat = (props) => {
  const { route } = props;
  const { driverId } = route.params;
  socket = io("ws://172.20.10.6:8800")
  const [state, setState] = useContext(AuthContext);
  const role=state.user.role;

  const userId = state.user._id;
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  let conversationUsers = { user1: userId, user2: driverId };
  let users = Object.keys(conversationUsers).sort();
  let firstId = users[0];
  
  // useEffect(() => {

  // }, [userId]);
  useEffect(() => {
    getChat();
    props.navigation.setOptions({
      headerTitle: "Chat"
  });
}, []);

  // console.log("Driver id",driverId)


  useEffect(() => {
    if(conversationId !==null){
      getMessages();
    }
  }, [conversationId]);
  
  const getChat = async () => {
    try {
        const { data } = await axios.get(`http://172.20.10.6:8000/api/findChat?firstId=${userId}&secondId=${driverId}`);
        if (data) {
            setConversationId(data._id);
        }
    } catch (error) {
        console.log(error);
    }
  }

  setTimeout(()=>{
    if(conversationId !==null){
      getMessages();
    }
  },500)
  

  const getMessages = async () => {
    try {
      if(conversationId !==null){
        const { data } = await axios.get(`http://172.20.10.6:8000/api/getMessages?conversationId=${conversationId}`);
        setMessages(data.map((message) => {
          return {...message, user: {_id: message.senderId}}
        }));
      }
    } catch (error) {
        console.log(error);
    }
}

const sendMessage = async (text, conversationId) => {
  socket.emit("send-message", {
    conversationId,
        text,
    receiverId: driverId
  });
  try {
    const senderId = userId;
    await axios.post("http://172.20.10.6:8000/api/addMessage", {
       conversationId,
         senderId,
         text
    });
  } catch (error) {
    console.log(error);
  }
}

  //  const sendMessage = async (text, conversationId) => {
  //     socket.emit("send-message", {
  //       role,
  //       text,
  //       receiverId: 'userId'
  //     });
    
    
  //     try {
  //         const senderId = userId;
  //         await axios.post("http://172.20.10.6:8000/api/addMessage", {
  //            conversationId,
  //              senderId,
  //              text
  //         });
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }


  socket.on("recieve-message", (data) => {
    setMessages((prev) => GiftedChat.append(prev, data));
    PushNotification.localNotification({
      title: "New Message!",
      message: `tap to read it`,
      channelId:"com.etharproject"
    });
    PushNotification.configure({
      onNotification: (notification) => {
          console.log("NOTIFICATION:", notification);

        },
    });
  });

  
  // socket.on("recieve-message", (data) => {
  //   setMessages((previousMessages) => previousMessages.concat(messages.map(message => ({...message, user: {_id: data.senderId}}))));
  //   console.log("Received message:", data);
    
  // });


  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => previousMessages.concat(messages.map(message => ({...message, user: {_id: userId}})))

    );

    sendMessage(messages[0].text, conversationId)
  }, [conversationId]);


    const renderSend = (props) => {
        return (
          <Send {...props}>
            <View>
              <MaterialCommunityIcons
                name="send-circle"
                style={{marginBottom: 5, marginRight: 5}}
                size={32}
                color="#2e64e5"
              />
            </View>
          </Send>
        );
      };
    
      const renderBubble = (props) => {
        if (props.currentMessage.user._id === driverId) {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#2e64e5',
                },
              }}
              textStyle={{
                right: {
                  color: '#fff',
                },
              }}
            />
          );
        }
        return <Bubble {...props} />;
      };
      
    
      const scrollToBottomComponent = () => {
        return(
          <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
      }
    
      return (
        <GiftedChat
        messages={messages}
        onSend={onSend}
        inverted={false}
        renderSend={renderSend}
        renderBubble={renderBubble}
        user={{
          _id: userId
        }}
      />
      
      );
    };
    
    export default withNavigation(DriverChat) ;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });