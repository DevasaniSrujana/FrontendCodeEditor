import { useState, useEffect } from "react"
import Editor from "./components/Editor"
import Navbar from "./components/Navbar";

function App() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setsrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(
        `<html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>`
      );
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="app-container">
      <Navbar/>
      <div className="panel top-panel">
        <Editor language="xml" editorName="HTML" value={html} onChange={setHtml} />
        <Editor language="css" editorName="CSS" value={css} onChange={setCss} />
        <Editor language="javascript" editorName="JAVASCRIPT" value={js} onChange={setJs} />
      </div>
      <div className="panel output-panel">
        <div className="title">OUTPUT</div>
        <iframe
          srcDoc={srcDoc}
          className="output"
          title="output"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}

export default App
