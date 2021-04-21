import * as Tone from "tone";
import React, { useState } from 'react';

export default function Noise(props) {
    const [noiseType, setNoiseType] = useState('white');
    const [noiseFadeIn, setNoiseFadeIn] = useState('0');
    const [noiseFadeOut, setNoiseFadeOut] = useState('0');
    const [noiseRate, setNoiseRate] = useState('1');
    const [noiseVolume, setNoiseVolume] = useState('-6');


    const noise = new Tone.Noise({
        type: noiseType,
        fadeIn: noiseFadeIn,
        fadeOut: noiseFadeOut,
        playbackRate: noiseRate,
        volume: noiseVolume
    }).toDestination();

    const updateNoiseFadeIn = (event) => {
        if (event.target.value !== null && event.target.value !== '')
            setNoiseFadeIn(event.target.value);
        else
            setNoiseFadeIn(0);
    }

    const updateNoiseFadeOut = (event) => {
        if (event.target.value !== null && event.target.value !== '')
            setNoiseFadeOut(event.target.value);
        else
            setNoiseFadeOut(0);
    }


    function trigger() {
        noise.start();
    }

    function stop() {
        noise.stop();
    }

    let name = props.name;
    return (
        <div className='margin-top'>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop} onMouseLeave={stop}>⚫</button>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="noiseType" value={noiseType} onChange={e => setNoiseType(e.target.value)}>
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                        <option value="pink">Pink</option>
                    </select>
                    <div className='margin-top'>
                        <label>Playback rate:</label>
                        <input name='noiseRate' type='number' min='1' max='40' value={noiseRate} onChange={e => setNoiseRate(e.target.value)} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade In:</label>
                        <input name='fadeIn' type='number' min='0' max='40' value={noiseFadeIn} onChange={updateNoiseFadeIn} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade Out:</label>
                        <input name='fadeOut' type='number' min='0' max='40' value={noiseFadeOut} onChange={updateNoiseFadeOut} />
                    </div>
                    <div className='margin-top'>
                        <label>Volume:</label>
                        <input name='volume' type='range' min='-24' max='0' value={noiseVolume} onChange={e => setNoiseVolume(e.target.value)} />
                    </div>
                    <div className='margin-top'>
                        <button className='button-primary'>Save sound</button>
                        <button className='button-primary'>Download</button>
                    </div>
                </div>
            </div>
        </div>
    );

}