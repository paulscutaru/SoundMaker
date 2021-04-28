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

    const updateNoiseFadeIn = (e) => {
        if (e.currentTarget.value !== null && e.currentTarget.value !== '')
            setNoiseFadeIn(e.currentTarget.value);
        else
            setNoiseFadeIn(0);
    }

    const updateNoiseFadeOut = (e) => {
        if (e.currentTarget.value !== null && e.currentTarget.value !== '')
            setNoiseFadeOut(e.currentTarget.value);
        else
            setNoiseFadeOut(0);
    }


    function trigger() {
        noise.start();
    }

    function stop() {
        noise.stop();
    }

    function download() {
        const recorder = new Tone.Recorder()
        noise.connect(recorder)
        recorder.start()
        noise.start()
        noise.stop('+0.5')
        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            let date = new Date()
            let download_name = 'noise_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
            anchor.download = `${download_name}.mp3`;
            anchor.href = url;
            anchor.click();
        }, 1000);
    }

    let name = props.name;
    return (
        <div>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop} onMouseLeave={stop}>⚫</button>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="noiseType" defaultValue={noiseType} onChange={e => setNoiseType(e.target.value)}>
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                        <option value="pink">Pink</option>
                    </select>
                    <div className='margin-top'>
                        <label>Playback rate:</label>
                        <input name='noiseRate' type='number' min='1' max='40' defaultValue={noiseRate} onChange={e => setNoiseRate(e.target.value)} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade In:</label>
                        <input name='fadeIn' type='number' min='0' max='40' defaultValue={noiseFadeIn} onChange={updateNoiseFadeIn} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade Out:</label>
                        <input name='fadeOut' type='number' min='0' max='40' defaultValue={noiseFadeOut} onChange={updateNoiseFadeOut} />
                    </div>
                    <div className='margin-top'>
                        <label>Volume:</label>
                        <input name='volume' type='range' min='-24' max='0' defaultValue={noiseVolume} onChange={e => setNoiseVolume(e.target.value)} />
                    </div>
                    <div className='margin-top'>
                        <button className='button-primary' onClick={download}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    );

}