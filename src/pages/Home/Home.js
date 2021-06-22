import React, { useState } from "react";
import "./Home.css";
import Tool from '../../components/Tools/Tool'
import Sidebar from '../../components/Sidebar/Sidebar'
import GlobalOptions from '../../components/GlobalOptions/GlobalOptions'
import Logo from '../../components/Logo/Logo'

export default function Home(props) {
    const [instrument, setInstrument] = useState('Synth');

    function handleInstrumentChange(newInstrument) {
        setInstrument(newInstrument);
    }

    return (
        <div>
            <div className='Home'>
                <Sidebar name={instrument} onClick={handleInstrumentChange} />
                <div className='Content'>
                    <Logo />
                    <div className='Instrument'>
                        <Tool name={instrument} />
                    </div>
                    <GlobalOptions />
                </div>

            </div>
        </div>
    );

}
