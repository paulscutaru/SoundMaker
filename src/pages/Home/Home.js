import React from "react";
import "./Home.css";

import Tool from '../../components/Tools/Tool'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'

export default function Home(props) {
    const [instrument, setInstrument] = React.useState('Synth');

    function handleInstrumentChange(newInstrument) {
        setInstrument(newInstrument);
        console.log('Instrument set: ' + newInstrument)
    }

    return (
        <div className='Home'>
            <Sidebar name={instrument} onClick={handleInstrumentChange} />
            <div className='Content'>
                <Header />
                <div className='Instrument'>
                    <Tool name={instrument} />
                </div>
            </div>
        </div>
    );

}
