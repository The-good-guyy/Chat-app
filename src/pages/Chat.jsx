import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { allUserRoutes, host } from "../utils/APIRoutes";
import Contact from "../components/Contract";
import Welcome from "../components/Welcome";
import ChatComponent from "../components/ChatComponent";
import { io } from "socket.io-client";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const dataFetch = useRef(false);
  const socket = useRef();
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    async function setUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    setUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    async function setAvatar() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoutes}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/avatar");
        }
      }
    }
    setAvatar();
  }, [currentUser]);
  return (
    <Container>
      <div className="container">
        <Contact contacts={contacts} changeChat={handleChatChange}></Contact>
        {currentUser &&
          (isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser}></Welcome>
          ) : (
            <ChatComponent
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          ))}
      </div>
    </Container>
  );
}
export default Chat;
