import React from "react";
import "./App.css";

import Instrument from './components/Instrument/Instrument'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'

export default function App(props) {
  const [data, setData] = React.useState(null);
  const [instrument,setInstrument] = React.useState('Synth');

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  function handleInstrumentChange(newInstrument) {
    setInstrument(newInstrument);
    console.log('Instrument set: ' + newInstrument)
  }

  return (
    <div className='App'>
      <Sidebar name={instrument} onClick={handleInstrumentChange}/>
      <div className='Content'>
        <Header />
        <div className='Instrument'>
          <Instrument name={instrument} />
        </div>
        <h1>{!data ? "Loading..." : data}</h1>
      </div>
    </div>
  );

}
