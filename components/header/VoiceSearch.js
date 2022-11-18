import React from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { MdKeyboardVoice, MdSettingsVoice } from "react-icons/md";
import { useRouter } from "next/router";

const VoiceSearch = ({ className }) => {
  const router = useRouter();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  // console.log({ transcript });

  return (
    <div
      className={`text-2xl ${
        className ? className : "text-white"
      } voiceSearch-div`}
      style={{ display: "flex" }}
      onClick={e => {
        e.preventDefault();
        resetTranscript();

        if (!listening) {
          startListening();
        } else {
          SpeechRecognition.stopListening();
          setTimeout(() => {
            router.push(`/search?keyword=${transcript}`);
          }, 300);
        }
      }}
    >
      {!listening ? <MdKeyboardVoice /> : <MdSettingsVoice />}
    </div>
  );
};

export default VoiceSearch;
