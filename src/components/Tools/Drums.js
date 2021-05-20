import * as Tone from "tone";
import React, { useState } from 'react';
import saveSound from '../utils/saveSound';

export default function Drums(props) {
    const [drumDetune, setDrumDetune] = useState('0');
    const [drumType, setDrumType] = useState('kick');
    const [drumVolume, setDrumVolume] = useState('-3');

    var drum;

    switch (drumType) {
        case 'cymbal':
            drum = new Tone.MetalSynth({
                detune: drumDetune,
                volume: drumVolume
            }).toDestination();
            break;
        case 'kick':
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

    var reverbAmount, pingPongAmount = 0
    const reverb = new Tone.Reverb().toDestination()
    const pingPong = new Tone.PingPongDelay().toDestination()

    drum.connect(reverb)
    drum.connect(pingPong)

    let date = new Date()
    let file_name = 'drum_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getSeconds()

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

    function trigger() {
        applyEffects()
        drum.triggerAttackRelease('C1', '6n');
    }

    const updateDetune = (e) => {
        if (e.currentTarget.value !== '-')
            setDrumDetune(e.currentTarget.value);
    }

    function download() {
        const recorder = new Tone.Recorder()
        drum.connect(recorder)
        recorder.start()
        drum.triggerAttackRelease('C1', '6n');
        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            anchor.download = `${file_name}.mp3`;
            anchor.href = url;
            anchor.click();
        }, 1000);
    }

    var name = props.name;
    return (
        <div className='Drums'>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger}>⚫</button>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="drumType" value={drumType} onChange={e => setDrumType(e.currentTarget.value)}>
                        <option value="kick">Kick</option>
                        <option value="cymbal">Cymbal</option>
                    </select>
                </div>
                <div className='margin-top'>
                    <label>Detune:</label>
                    <input name='detune' type='number' min='-4000' max='4000' defaultValue={drumDetune} onChange={updateDetune} />
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
                    <input name='volume' type='range' min='-24' max='0' defaultValue={drumVolume} onChange={e => setDrumVolume(e.currentTarget.value)} />
                </div>
                <div>
                    <button className='button-primary' onClick={() => saveSound(file_name, drumType, drum.get(), applyEffects())}>Save sound</button>
                    <button className='button-primary' onClick={download}>Download</button>
                </div>
            </div>
        </div>
    );
}