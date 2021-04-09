import React from "react";
import "./Home.css";

import Instrument from '../../components/Instrument/Instrument'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'

export default function Home(props) {
    //const [data, setData] = React.useState(null);
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
                    <Instrument name={instrument} />
                </div>
            </div>
        </div>
    );

}
