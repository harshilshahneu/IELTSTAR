import React, { useState } from "react";

import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

const StatsOutput = ({ title, stats }) => (
  <section>
    <h3>{title}</h3>
    <pre>{JSON.stringify(stats, null, 2)}</pre>
  </section>
);

export const Editors = () => {
  const [docStats, setDocStats] = useState();
  const [sessionStats, setSessionStats] = useState();

  return (
    <Grammarly clientId={demoClientId}>
      <h2>Textarea</h2>
      <GrammarlyEditorPlugin
        onDocumentStats={(evt) => setDocStats(evt.detail)}
        onSessionStats={(evt) => setSessionStats(evt.detail)}
      >
        <textarea defaultValue={demoText.textarea} rows={10}></textarea>
      </GrammarlyEditorPlugin>
      {docStats && <StatsOutput stats={docStats} title="Document Stats" />}
      {sessionStats && (
        <StatsOutput stats={sessionStats} title="Session Stats" />
      )}
    </Grammarly>
  );
};
