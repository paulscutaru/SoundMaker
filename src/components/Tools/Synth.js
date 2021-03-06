import * as Tone from "tone";
import React, { useState } from 'react';
import getNotesBetween from "../utils/getNotesBetween";
import saveSound from '../utils/saveSound'
/*https://github.com/ganeshmani/react-piano-hooks*/

export default function Synth(props) {
    var synth;
    const [synthType, setSynthType] = useState('synth')
    const [synthDetune, setSynthDetune] = useState('0')
    const [synthVolume, setSynthVolume] = useState('-6')

    var notesPlayed = []

    switch (synthType) {
        case 'synth':
            synth = new Tone.Synth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        case 'monosynth':
            synth = new Tone.MonoSynth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        case 'fmsynth':
            synth = new Tone.FMSynth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        case 'amsynth':
            synth = new Tone.AMSynth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        default:
            synth = new Tone.Synth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
    }

    var reverbAmount, pingPongAmount = 0
    const reverb = new Tone.Reverb().toDestination()
    const pingPong = new Tone.PingPongDelay().toDestination()

    synth.connect(reverb)
    synth.connect(pingPong)

    let date = new Date()
    let file_name = 'synth_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getSeconds()

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

    function updateNotesPlayed(note) {
        notesPlayed = notesPlayed + note + ',';
        var list = document.getElementById('notes-played-list');

        var newListItem = document.createElement('li');
        newListItem.textContent = note + ',';

        list.appendChild(newListItem);
    }

    function deleteNotesPlayed() {
        notesPlayed = []
        document.getElementById('notes-played-list').innerHTML = ''
    }

    function showNotesPlayed() {
        var list = document.getElementById('notes-played-list');
        var button_show = document.getElementById('show-notes-button')
        if (list.style.display === 'none') {
            list.style.display = 'flex'
            button_show.innerText = 'Hide notes played'
        } else {
            list.style.display = 'none'
            button_show.innerText = 'Show notes played'
        }
    }

    function playNote(note) {
        updateNotesPlayed(note)
        applyEffects()
        synth.triggerAttackRelease(`${note}`, "6n")
    }

    function getTilesButtons() {
        const notes = getNotesBetween('C2', 'B5')
        var tile_class = 'tile'

        return notes.map((note) => {
            if (note.includes('#'))
                tile_class = 'tile_sharp'
            else
                tile_class = 'tile'

            return (
                <button key={note} className={tile_class} onMouseDown={() => playNote(note)}></button>
            )
        })

    }

    const updateDetune = (e) => {
        if (e.currentTarget.value !== '-')
            setSynthDetune(e.currentTarget.value);
    }

    function download() {
        const recorder = new Tone.Recorder()
        synth.connect(recorder)
        recorder.start()
        synth.triggerAttackRelease('C4', '6n')
        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            anchor.download = `${file_name}.mp3`;
            anchor.href = url;
            anchor.click();
        }, 1000);
    }

    return (
        <div className='piano-container'>
            <h2>{props.name}</h2>
            <div className='tiles-wrapper'>
                {getTilesButtons()}
            </div>
            <div>
                <div className='notes-played-container'>
                    <ul id='notes-played-list' >
                    </ul>
                </div>
                <button id='show-notes-button' className='button-primary margin-top' onClick={showNotesPlayed}>Hide notes played</button>
                <button id='clear-notes-button' className='button-primary margin-top' onClick={deleteNotesPlayed}>Clear</button>
            </div>

            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="synthType" defaultValue={synthType} onChange={e => setSynthType(e.currentTarget.value)}>
                        <option value="synth">Synth</option>
                        <option value="monosynth">MonoSynth</option>
                        <option value="fmsynth">FMSynth</option>
                        <option value="amsynth">AMSynth</option>
                    </select>
                </div>
                <div className='margin-top'>
                    <label>Detune:</label>
                    <input name='detune' type='number' min='-4000' max='4000' defaultValue={synthDetune} onChange={updateDetune} />
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
                    <input name='volume' type='range' min='-24' max='0' defaultValue={synthVolume} onChange={e => setSynthVolume(e.currentTarget.value)} />
                </div>
                <div>
                    <button className='button-primary' onClick={() => saveSound(file_name, synthType, synth.get(), applyEffects())}>Save sound</button>
                    <button className='button-primary' onClick={download}>Download</button>
                </div>
            </div>
        </div>
    );
}