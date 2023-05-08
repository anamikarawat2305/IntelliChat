import { usePostAiAssistMutation } from "@/state/api";
import React, { useEffect, useState } from "react";
import MessageFormUI from "./MessageFormUI";

// https://usehooks.com/useDebounce/ - debounce hook from here
//to prevent too many api calls to the ai assist api endpoint 
//when user is typing in the message form input field - this hook is used in the AiAssist component below 
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
//AiAssist helps to auto complete the user's message by suggesting the next word 
//to type in the message form input field
const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  const debouncedValue = useDebounce(message, 1000);
//useEffect hook to trigger the ai assist api endpoint to get the next word to type in the message form input field
  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]); // eslint-disable-line

//handleKeyDown function to handle the enter and tab key presses
  const handleKeyDown = (e) => {
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

//useEffect hook to set the appendText state to the next word to type in the message form input field
  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); // eslint-disable-line

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}

      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;