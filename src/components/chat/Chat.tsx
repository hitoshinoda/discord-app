import React, { useState, useEffect } from 'react'
import "./Chat.scss"
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useAppSelecter } from '../../app/hooks';
import { db } from '../../firebase';
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import useSubCollection from '../../hooks/useSubCollection';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const Chat = () => {
  const user = useAppSelecter((state) => state.user.user);
  const channelId = useAppSelecter((state) => state.channel.channelId);
  const channelName = useAppSelecter((state) => state.channel.channelName);
  const [inputText, setInputText] = useState<string>("");
  const { subDocuments: messages } = useSubCollection("channels", "messages");
  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  };

  return (
    <div className='chat'>
        {/* ChatHeader */}
        <ChatHeader channelName={channelName} />
        {/* ChatMessage */}
        <div className='chatMessages'>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message.message} timestamp={message.timestamp} user={message.user} />
          ))}
        </div>
        {/* ChatInput */}
        <div className='chatInput'>
          <ControlPointIcon />
          <form>
            <input type="text" placeholder='#Udemyへメッセージを送信' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} value={inputText} />
            <button type='submit' className='chatInputButton' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
              送信
            </button>
          </form>
          <div className='chatInputIcons'>
            <CardGiftcardIcon />
            <GifIcon />
            <EmojiEmotionsIcon />
          </div>
        </div>
    </div>
  )
}

export default Chat