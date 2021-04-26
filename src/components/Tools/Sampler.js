import * as Tone from "tone";
import React, { useState } from 'react';

import getNotesBetween from "../utils/getNotesBetween";

export default function Sampler(props) {
    let name = props.name;

    const [samplerSound, setSamplerSound] = useState('')
    const [showNotesPlayed, setShowNotesPlayed] = useState(false)
    var [notesPlayed, setNotesPlayed] = useState([])
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const sampler = new Tone.Sampler().toDestination();

    function playNote(note) {
        sampler.triggerAttackRelease(`${note}`, "6n")
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

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
        if (isSelected) {
            sampler.add('C4',URL.createObjectURL(selectedFile))
            console.log('Selected file in sampler: ', event.target.files[0].name)
        }
    };

    return (
        <div className='piano-container'>
            <h2>{name}</h2>
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
                    <label>Upload sound:</label>
                    <input type="file" name="file" accept='.mp3' onChange={changeHandler} />
                    <label>Select sound:</label>
                    <select name="sound" value={samplerSound} onChange={e => setSamplerSound(e.target.value)}>
                    </select>
                </div>
            </div>
        </div>
    );

}
