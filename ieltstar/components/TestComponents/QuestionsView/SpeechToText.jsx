import dynamic from 'next/dynamic'
import styles from '../../../styles/quizstyles/SpeakingView.module.scss';
// const useSpeechToText = dynamic(() => import('react-hook-speech-to-text'), { ssr: false });
// const useSpeechToText = (await import('react-hook-speech-to-text')).default;

// const {SpeechRecognition} = dynamic(() => import('react-speech-recognition'), { ssr: false });
// const {useSpeechRecognition} = dynamic(() => import('react-speech-recognition'), { ssr: false });

import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const Dictaphone = ({ handler}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [language, setLanguage] = useState("en-IN");
  const [data, setData] = useState("");

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  useEffect(()=>{
    handler(transcript)
  },[transcript]
  )
  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      {/* <select
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
        value={language}
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
      </select> */}
      {/* <br /> <br /> */}
      <textarea id="te" rows="3" cols="100" value={transcript} className={styles.speaking_view_textarea} />
      <br /> <br />
      <button
        onClick={() =>
          SpeechRecognition.startListening({
            continuous: true,
            language: language
          })
        }
      >
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button
        onClick={() => {
          const el = document.getElementById("te");
          el.select();
          setData(el.value);
          document.execCommand("copy");
        }}
      >
        Copy
      </button>
      <button disabled>Paste</button>
      <button onClick={resetTranscript}>Reset</button>
      <br /> <br />
      <textarea id="final_output" rows="10" cols="100"></textarea>
      <br /> <br />
      <button
        onClick={() => {
          const el = document.getElementById("final_output");
          el.select();
          document.execCommand("copy");
        }}
      >
        Copy Final Result
      </button>
    </div>
  );
};
export default Dictaphone;
