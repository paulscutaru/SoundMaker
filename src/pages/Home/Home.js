import React, {useState} from "react";
import "./Home.css";

import Tool from '../../components/Tools/Tool'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import GlobalOptions from '../../components/GlobalOptions/GlobalOptions'

export default function Home(props) {
    const [instrument, setInstrument] = useState('Synth');

    function handleInstrumentChange(newInstrument) {
        setInstrument(newInstrument);
        console.log('Instrument set: ' + newInstrument)
    }

    return (
        <div className='Home'>
            <Sidebar name={instrument} onClick={handleInstrumentChange} />
            <div className='Content'>
                <Header />
                <GlobalOptions />
                <div className='Instrument'>
                    <Tool name={instrument} />
                </div>
            </div>
        </div>
    );

}
