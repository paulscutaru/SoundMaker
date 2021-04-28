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

    const updateFrequency = (e) => {
        if (e.currentTarget.value !== null && e.currentTarget.value !== '')
            setOscFrequency(e.currentTarget.value);
        else
            setOscFrequency(0);
    }

    const updateDetune = (e) => {
        if (e.currentTarget.value !== '-')
            setOscDetune(e.currentTarget.value);
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
            let date = new Date()
            let download_name = 'osc_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
            anchor.download = `${download_name}.mp3`;
            anchor.href = url;
            anchor.click();
        }, 1000);
    }

    let name = props.name;
    return (
        <div className='Oscillator'>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop} onMouseLeave={stop}>⚫</button>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Frequency:</label>
                    <input name='frequency' type='number' min='20' max='4000' defaultValue={oscFrequency} onChange={updateFrequency} />
                </div>
                <div className='margin-top'>
                    <label>Detune:</label>
                    <input name='detune' type='number' min='-4000' max='4000' defaultValue={oscDetune} onChange={updateDetune} />
                </div>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="oscType" defaultValue={oscType} onChange={e => setOscType(e.target.value)}>
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div className='margin-top'>
                    <label>Volume:</label>
                    <input name='volume' type='range' min='-24' max='0' defaultValue={oscVolume} onChange={e => setOscVolume(e.target.value)} />
                </div>
                <div className='margin-top'>
                    <button className='button-primary' onClick={download}>Download</button>
                </div>
            </div>
        </div>
    );
}