import React from "react";
import "./App.css";

import Instrument from './components/Instrument/Instrument'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'

export default function App(props) {
  const [instrument,setInstrument] = React.useState('Synth');

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

      </div>

    </div>
  );

}
