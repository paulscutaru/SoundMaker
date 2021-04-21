import * as Tone from "tone";
import React, { useState } from 'react';
import getNotesBetween from "../utils/getNotesBetween";

export default function Synth(props) {
    var synth;
    const [synthType, setSynthType] = useState('Synth')
    const [synthDetune, setSynthDetune] = useState('0')
    const [synthVolume, setSynthVolume] = useState('-6')

    const [showNotesPlayed, setShowNotesPlayed] = useState(false)
    var [notesPlayed, setNotesPlayed] = useState([])

    switch (synthType) {
        case 'Synth':
            synth = new Tone.Synth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        case 'MonoSynth':
            synth = new Tone.MonoSynth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        case 'FMSynth':
            synth = new Tone.FMSynth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        case 'AMSynth':
            synth = new Tone.AMSynth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
            break;
        case 'PluckSynth':
            synth = new Tone.PluckSynth({
                detune: synthDetune,
                volume: synthVolume,
                resonance: 0.95
            }).toDestination();
            break;
        default:
            synth = new Tone.Synth({
                detune: synthDetune,
                volume: synthVolume
            }).toDestination();
    }

    function playNote(note) {
        synth.triggerAttackRelease(`${note}`, "6n")
        setNotesPlayed([...notesPlayed, note])
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

    const updateDetune = (event) => {
        if (event.target.value !== '-')
            setSynthDetune(event.target.value);
    }

    function download(){
        const recorder = new Tone.Recorder()
        synth.connect(recorder)
        recorder.start()
        synth.triggerAttackRelease('C4','6n')
        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            anchor.download = "recording.webm";
            anchor.href = url;
            anchor.click();
        }, 1000);
    }

    return (
        <div className='piano-container'>
            <h2>{synthType}</h2>
            <div className='tiles-wrapper'>
                {getTilesButtons()}
            </div>
            {showNotesPlayed ?
                (
                    <div>
                        <div className='notes-played-container'>
                            <ul>
                                {notesPlayed.map((note, index) => (<li key={index}>{note},</li>))}
                            </ul>

                        </div>
                        <button className='button-primary margin-top' onClick={() => setShowNotesPlayed(false)}>Hide notes played</button>
                        <button className='button-primary margin-top' onClick={() => setNotesPlayed([])}>Clear</button>
                    </div>
                ) :
                (
                    <button className='button-primary margin-top' onClick={() => setShowNotesPlayed(true)}>Show notes played</button>
                )
            }
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="synthType" value={synthType} onChange={e => setSynthType(e.target.value)}>
                        <option value="Synth">Synth</option>
                        <option value="MonoSynth">MonoSynth</option>
                        <option value="FMSynth">FMSynth</option>
                        <option value="AMSynth">AMSynth</option>
                        <option value="PluckSynth">PluckSynth</option>
                    </select>
                </div>
                <div className='margin-top'>
                    <label>Detune:</label>
                    <input name='detune' type='number' min='-4000' max='4000' value={synthDetune} onChange={updateDetune} />
                </div>
                <div className='margin-top'>
                    <label>Volume:</label>
                    <input name='volume' type='range' min='-24' max='0' value={synthVolume} onChange={e => setSynthVolume(e.target.value)} />
                </div>
                <div className='margin-top'>
                    <button className='button-primary'>Save sound</button>
                    <button className='button-primary' onClick={download}>Download</button>
                </div>
            </div>
        </div>
    );
}