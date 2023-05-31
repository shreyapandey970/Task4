import React,{useState} from 'react'
import './App.css'

const App = () => {
  const [html, sethtml] = useState("");
  const [css, setcss] = useState("");
  const [js, setjs] = useState("");
  const [error, setError] = useState('');

  const handleOutput = async(e) =>{
      const iframe = document.getElementById("output");
      iframe.contentDocument.body.innerHTML = html + "<style>" + css + "<style>";  //for html and css
      //iframe.contentWindow.eval(js);

      try {
        iframe.contentWindow.eval(js);
        setError('');
      } catch (error) {
        setError(error.message);
        //console.log(error.message);
        window.alert(error.message);
      }
  }

  const handleClear = async(e) => {
    sethtml('');
    setcss('');
    setjs('');

    const iframe = document.getElementById('output');
    iframe.contentDocument.body.innerHTML = '';
  }

  const handleDownload = () => {
    const code = `<!DOCTYPE html>
                  <html>
                    <head>
                        <title>Code Download</title>
                        <style>${css}</style>
                    </head>
                    <body>
                    ${html}
                    <script>${js}</script>
                    </body>
                  </html>`;

  const element = document.createElement('a');
  const file = new Blob([code], { type: 'text/html' });
  element.href = URL.createObjectURL(file);
  element.download = 'code.html';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  }

  return (
    <div className="playground">
      <div id="title">
        <img src={require('./images/logo.png')} id="logo" />
      </div>
      <div>
        <h3 id="font">HTML</h3>
        <textarea id="txt" name="html" onChange={(e) => sethtml(e.target.value)} />
        <br />
        <h3 id="font1">CSS</h3>
        <textarea id="txt" name="css" onChange={(e) => setcss(e.target.value)} />
        <br />
        <h3 id="font2">JAVASCRIPT</h3>
        <textarea id="txt" name="js" onChange={(e) => setjs(e.target.value)} />
      </div>
      <div className='right'>
        <button onClick={handleOutput} id="button">Run</button>
        <button onClick={handleClear} id="button">Clear</button>
        <button onClick={handleDownload} id="button">Download</button><br></br>
       <iframe id="output" title="OCE"></iframe>
       
      </div>
    </div>
  )
}

export default App
