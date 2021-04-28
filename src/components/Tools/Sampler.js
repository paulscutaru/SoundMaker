import * as Tone from "tone";
import React, { useState } from 'react';

import getNotesBetween from "../utils/getNotesBetween";

export default function Sampler(props) {
    let name = props.name;

    const sampler = new Tone.Sampler().toDestination();
    var loaded = false;
    var url;

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

    function changeHandler(e) {
        var file = e.currentTarget.files[0]
        if (file && (file.size < 4194304)) {
            url = URL.createObjectURL(e.currentTarget.files[0])
            sampler.add('C4', url)
            loaded = true
            console.log('Selected file in sampler: ', e.currentTarget.files[0].name)
        }
        else
            alert('File must be under 4 MB!')
    };

    function playNote(note) {
        if (loaded)
            sampler.triggerAttackRelease(`${note}`, 1)
        else
            alert('Upload a sample!')
    }

    return (
        <div className='piano-container'>
            <h2>{name}</h2>
            <div className='tiles-wrapper'>
                {getTilesButtons()}
            </div>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <label>Upload sound:</label>
                    <input type="file" name="file" accept='.mp3' onChange={changeHandler} />
                </div>
            </div>
        </div>
    );

}
