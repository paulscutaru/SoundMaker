import * as Tone from "tone";
import React, { useState } from 'react';

export default function Oscillator(props) {
    const [oscFrequency, setOscFrequency] = useState('440');
    const [oscDetune, setOscDetune] = useState('0');
    const [oscType, setOscType] = useState('sine');
    const [oscVolume, setOscVolume] = useState('-6');

    const oscillator = new Tone.Oscillator({
        frequency: oscFrequency,
        detune: oscDetune,
        type: oscType,
        volume: oscVolume
    }).toDestination();

    const updateFrequency = (event) => {
        if (event.target.value !== null && event.target.value !== '')
            setOscFrequency(event.target.value);
        else
            setOscFrequency(0);
    }

    const updateDetune = (event) => {
        if (event.target.value !== '-')
            setOscDetune(event.target.value);
    }

    function trigger() {
        oscillator.start();
    }

    function stop() {
        oscillator.stop();
    }

    function download(){
        const recorder = new Tone.Recorder()
        oscillator.connect(recorder)
        recorder.start()
        oscillator.start()
        oscillator.stop('+0.5')
        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            anchor.download = "recording.webm";
            anchor.href = url;
            anchor.click();
        }, 1000);
    }

    let name = props.name;
    return (
        <div className='Oscillator margin-top'>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop} onMouseLeave={stop}>⚫</button>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Frequency:</label>
                    <input name='frequency' type='number' min='20' max='4000' value={oscFrequency} onChange={updateFrequency} />
                </div>
                <div className='margin-top'>
                    <label>Detune:</label>
                    <input name='detune' type='number' min='-4000' max='4000' value={oscDetune} onChange={updateDetune} />
                </div>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="oscType" value={oscType} onChange={e => setOscType(e.target.value)}>
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div className='margin-top'>
                    <label>Volume:</label>
                    <input name='volume' type='range' min='-24' max='0' value={oscVolume} onChange={e => setOscVolume(e.target.value)} />
                </div>
                <div className='margin-top'>
                    <button className='button-primary'>Save sound</button>
                    <button className='button-primary' onClick={download}>Download</button>
                </div>
            </div>
        </div>
    );
}