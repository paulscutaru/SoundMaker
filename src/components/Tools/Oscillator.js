import * as Tone from "tone";
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Oscillator(props) {
    const [oscFrequency, setOscFrequency] = useState('440');
    const [oscType, setOscType] = useState('sine');
    const [oscVolume, setOscVolume] = useState('-10');

    const oscillator = new Tone.Oscillator({
        frequency: oscFrequency,
        type: oscType,
        volume: oscVolume
    }).toDestination();

    var reverbAmount, pingPongAmount = 0
    const reverb = new Tone.Reverb().toDestination()
    const pingPong = new Tone.PingPongDelay().toDestination()

    oscillator.connect(reverb)
    oscillator.connect(pingPong)

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
    }

    const updateFrequency = (e) => {
        if (e.currentTarget.value !== null && e.currentTarget.value !== '')
            setOscFrequency(e.currentTarget.value);
        else
            setOscFrequency(0);
    }

    function trigger() {
        applyEffects()
        oscillator.start()
        oscillator.stop('+0.25')
    }

    function saveSound(option) {
        const recorder = new Tone.Recorder()
        applyEffects()
        oscillator.connect(recorder)
        recorder.start()
        oscillator.start()
        oscillator.stop('+0.25')
        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            if (option === 'user') {
                let date = new Date()
                let download_name = 'osc_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate()
                const anchor = document.createElement("a")
                anchor.download = `${download_name}.mp3`
                anchor.href = url
                anchor.click()
            }
            else if (option === 'server') {
                add()
            }
        }, 1000);
    }

    const add = () => {
        axios.post(
            "http://localhost:3001/sounds",
            {
                description: 'caca',
                UserId: 1,
            },
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            }
        )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    console.log(response.data);
                }
            });
    };

    let name = props.name;
    return (
        <div className='Oscillator'>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger}>⚫</button>
            <div className='Edit'>
                <div className='Options'>
                    <h3>Options</h3>
                    <div className='margin-top'>
                        <label>Frequency:</label>
                        <input name='frequency' type='number' min='20' max='4000' defaultValue={oscFrequency} onChange={updateFrequency} />
                    </div>
                    <div className='margin-top'>
                        <label>Type:</label>
                        <select name="oscType" defaultValue={oscType} onChange={e => setOscType(e.currentTarget.value)}>
                            <option value="sine">Sine</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                        </select>
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
                        <input name='volume' type='range' min='-24' max='-6' defaultValue={oscVolume} onChange={e => setOscVolume(e.currentTarget.value)} />
                    </div>
                    <div>
                        <button className='button-primary' onClick={() => saveSound('server')}>Save sound</button>
                        <button className='button-primary' onClick={() => saveSound('user')}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
}