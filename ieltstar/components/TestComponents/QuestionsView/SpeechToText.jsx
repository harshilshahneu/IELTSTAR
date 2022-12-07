import styles from "../../../styles/quizstyles/QuestionView.module.scss";
// const useSpeechToText = dynamic(() => import('react-hook-speech-to-text'), { ssr: false });
// const useSpeechToText = (await import('react-hook-speech-to-text')).default;

// const {SpeechRecognition} = dynamic(() => import('react-speech-recognition'), { ssr: false });
// const {useSpeechRecognition} = dynamic(() => import('react-speech-recognition'), { ssr: false });

import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

let demoClientId = "client_9m1fYK3MPQxwKsib5CxtpB";


const StatsOutput = ({ title, stats }) => (
  <section>
    <h3>{title}</h3>
    <pre>{JSON.stringify(stats, null, 2)}</pre>
  </section>
);

const Dictaphone = ({ handler}) => {
    // const [grammarlyConfig, setGrammarlyConfig] = useState({ underlines: "on", suggestionCards: "on" })
    const [docStats, setDocStats] = useState();
    const [sessionStats, setSessionStats] = useState();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [language, setLanguage] = useState("hi-IN");
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
      <select
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
        value={language}
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
      </select>
      <br /> <br />
      {/* <textarea id="te" rows="3" cols="100" value={transcript} /> */}
      <Grammarly clientId={demoClientId}>
      <h2>Textarea</h2>
      <GrammarlyEditorPlugin
        config={{ underlines: "off", suggestionCards: "off", activation: "immediate" }}
        onDocumentStats={(evt) => setDocStats(evt.detail)}
        onSessionStats={(evt) => setSessionStats(evt.detail)}
      >
        <textarea
          defaultValue={transcript}
          rows={10}
          className={styles.question_view_textarea}
          disabled
        ></textarea>
      </GrammarlyEditorPlugin>
      {docStats && <StatsOutput stats={docStats} title="Document Stats" />}
      {sessionStats && (
        <StatsOutput stats={sessionStats} title="Session Stats" />
      )}
    </Grammarly>
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
      <button onClick={()=>{SpeechRecognition.stopListening();document.querySelector(".QuestionView_question_view_textarea__nlBO4").select()
}}>Stop</button>
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
