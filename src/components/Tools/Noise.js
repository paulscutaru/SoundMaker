import * as Tone from "tone";
import React, { useState } from 'react';
import saveSound from '../utils/saveSound'

export default function Noise(props) {
    const [noiseType, setNoiseType] = useState('brown');
    const [noiseFadeIn, setNoiseFadeIn] = useState('0');
    const [noiseFadeOut, setNoiseFadeOut] = useState('0');
    const [noiseRate, setNoiseRate] = useState('1');
    const [noiseVolume, setNoiseVolume] = useState('-12');

    const noise = new Tone.Noise({
        type: noiseType,
        fadeIn: noiseFadeIn,
        fadeOut: noiseFadeOut,
        playbackRate: noiseRate,
        volume: noiseVolume
    }).toDestination();

    var reverbAmount, pingPongAmount = 0
    const reverb = new Tone.Reverb().toDestination()
    const pingPong = new Tone.PingPongDelay().toDestination()

    noise.connect(reverb)
    noise.connect(pingPong)

    let date = new Date()
    let file_name = 'noise_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getSeconds()

    function applyEffects() {
        if (reverbAmount > 0) {
            reverb.set({
                decay: reverbAmount,
                wet: 1
            })
        }
        else {
            reverb.set({
                wet: 0
            })
        }
        if (pingPongAmount > 0) {
            pingPong.set({
                delayTime: pingPongAmount,
                wet: 1
            })
        }
        else {
            pingPong.set({
                wet: 0
            })
        }
        let effects = [
            { reverb: reverb.get() },
            { pingPong: pingPong.get() },
        ]
        return effects
    }

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
        applyEffects()
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
            anchor.download = `${file_name}.mp3`;
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
                    <select name="noiseType" defaultValue={noiseType} onChange={e => setNoiseType(e.currentTarget.value)}>
                        <option value="brown">Brown</option>
                        <option value="pink">Pink</option>
                        <option value="white">White</option>
                    </select>
                    <div className='margin-top'>
                        <label>Playback rate:</label>
                        <input name='noiseRate' type='number' min='1' max='40' defaultValue={noiseRate} onChange={e => setNoiseRate(e.currentTarget.value)} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade In:</label>
                        <input name='fadeIn' type='number' min='0' max='40' defaultValue={noiseFadeIn} onChange={updateNoiseFadeIn} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade Out:</label>
                        <input name='fadeOut' type='number' min='0' max='40' defaultValue={noiseFadeOut} onChange={updateNoiseFadeOut} />
                    </div>
                    <div>
                        <h3>Effects</h3>
                        <div>
                            <label>Reverb:</label>
                            <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { reverbAmount = e.currentTarget.value }} />
                        </div>
                        <div>
                            <label>Ping pong:</label>
                            <input name='volume' type='range' min='0' max='1' step='0.1' defaultValue='0' onChange={(e) => { pingPongAmount = e.currentTarget.value }} />
                        </div>
                    </div>
                    <div>
                        <label>Volume:</label>
                        <input name='volume' type='range' min='-24' max='-6' defaultValue={noiseVolume} onChange={e => setNoiseVolume(e.currentTarget.value)} />
                    </div>
                    <div>
                        <button className='button-primary' onClick={() => saveSound(file_name, 'noise', noise.get(), applyEffects())}>Save sound</button>
                        <button className='button-primary' onClick={download}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    );

}