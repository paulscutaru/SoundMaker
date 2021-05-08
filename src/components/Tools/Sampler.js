import * as Tone from "tone";
import React from 'react';

import getNotesBetween from "../utils/getNotesBetween";

export default function Sampler(props) {
    let name = props.name;

    const sampler = new Tone.Sampler().toDestination();
    var loaded = false;
    var url;

    var notesPlayed = []

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
        if (loaded) {
            sampler.triggerAttackRelease(`${note}`, 1)
            updateNotesPlayed(note)
        }
        else
            alert('Upload a sample!')
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

    return (
        <div className='piano-container'>
            <h2>{name}</h2>
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
                    <label>Upload sound:</label>
                    <input type="file" name="file" accept='.mp3' onChange={changeHandler} />
                </div>
            </div>
        </div>
    );

}
