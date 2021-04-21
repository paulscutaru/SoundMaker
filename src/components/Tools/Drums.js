import * as Tone from "tone";
import React, { useState } from 'react';

export default function Drums(props) {
    const [drumDetune, setDrumDetune] = useState('0');
    const [drumType, setDrumType] = useState('sine');
    const [drumVolume, setDrumVolume] = useState('-6');

    let drum

    switch (drumType) {
        case 'Cymbal':
            drum = new Tone.MetalSynth({
                detune: drumDetune,
                volume: drumVolume
            }).toDestination();
            break;
        case 'Kick':
            drum = new Tone.MembraneSynth({
                detune: drumDetune,
                volume: drumVolume
            }).toDestination();
            break;
        default:
            drum = new Tone.MembraneSynth({
                detune: drumDetune,
                volume: drumVolume
            }).toDestination();
            break;
    }

    function trigger() {
        drum.triggerAttackRelease('C1', '6n');
    }

    const updateDetune = (event) => {
        if (event.target.value !== '-')
            setDrumDetune(event.target.value);
    }

    let name = props.name;
    return (
        <div className='Drums margin-top'>
            <h2>{name}</h2>
            <button className="play-button" onClick={trigger}>⚫</button>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="drumType" value={drumType} onChange={e => setDrumType(e.target.value)}>
                        <option value="Kick">Kick</option>
                        <option value="Cymbal">Cymbal</option>
                    </select>
                </div>
                <div className='margin-top'>
                    <label>Detune:</label>
                    <input name='detune' type='number' min='-4000' max='4000' value={drumDetune} onChange={updateDetune} />
                </div>
                <div className='margin-top'>
                    <label>Volume:</label>
                    <input name='volume' type='range' min='-24' max='0' value={drumVolume} onChange={e => setDrumVolume(e.target.value)} />
                </div>
                <div className='margin-top'>
                    <button className='button-primary'>Save sound</button>
                    <button className='button-primary'>Download</button>
                </div>
            </div>
        </div>
    );
}