import * as Tone from "tone";
import React, { useState } from 'react';
import getNotesBetween from "../utils/getNotesBetween";

function Oscillator(props) {
    const [frequency, setFrequency] = useState('440');
    const [oscType, setOscType] = useState('sine');

    const oscillator = new Tone.Oscillator(frequency, oscType).toDestination();

    const updateFrequency = (event) => {
        if (event.target.value > 0)
            setFrequency(Math.min(event.target.value, 4000));
    };

    const updateOscType = (event) => {
        setOscType(event.target.value);
    };

    function trigger() {
        oscillator.start();
    }

    function stop() {
        oscillator.stop();
    }

    let name = props.name;
    return (
        <div className='Oscillator'>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop} onMouseLeave={stop}>⚫</button>
            <div className='Options'>
                <div className='margin-top'>
                    <label>Frequency:</label>
                    <input name='frequency' value={frequency} onChange={updateFrequency} />
                </div>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="oscType" value={oscType} onChange={updateOscType}>
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function Noise(props) {
    const [noiseType, setNoiseType] = useState('white');

    const noise = new Tone.Noise(noiseType).toDestination();
    noise.volume.value = -6;

    const updateNoiseType = (event) => {
        setNoiseType(event.target.value);
    };

    function trigger() {
        noise.start();
    }

    function stop() {
        noise.stop();
    }

    let name = props.name;
    return (
        <div>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop} onMouseLeave={stop}>⚫</button>
            <div className='Options'>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="noiseType" value={noiseType} onChange={updateNoiseType}>
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                        <option value="pink">Pink</option>
                    </select>
                </div>
            </div>
        </div>
    );

}

function Player(props) {
    let player;

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    function trigger() {
        if (isSelected) {
            player = new Tone.Player(URL.createObjectURL(selectedFile.name)).toDestination()
            player.start()

        }
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
        console.log('Selected file in player: ', event.target.files[0].name)
    };

    let name = props.name;
    return (
        <div>
            <h2>{name}</h2>
            <input type="file" name="file" accept='.mp3' onChange={changeHandler} />
            {isSelected ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <button className="play-button" onClick={trigger}>⚫</button>
        </div>
    );
}

function Microphone(props) {
    let name = props.name;
    const meter = new Tone.Meter();
    const mic = new Tone.UserMedia().connect(meter);

    const [isMicOpen, setMicOpen] = useState(false);

    function trigger() {
        if (!isMicOpen) {
            setMicOpen(true)
            mic.open().then(() => {
                console.log("Mic opened.");
            }).catch(e => {
                // rejected when the user doesn't have or allow mic access
                console.log("Mic open rejected.");
            });
        }
        else {
            setMicOpen(false)
            mic.close()
            mic.dispose()
            console.log("Mic closed.");
        }
    }

    return (
        <div>
            <h2>{name}</h2>
            <button className="play-button" onClick={trigger}>⚫</button>
            {isMicOpen ? (
                <p>Mic is opened.</p>

            ) : (
                <p>Mic closed.</p>
            )}
        </div>
    );
}

function Synth(props) {
    let name = props.name;
    let synth;
    const [showNotesPlayed, setShowNotesPlayed] = useState(false)
    const [notesPlayed, setNotesPlayed] = useState([])

    switch (name) {
        case 'Synth':
            synth = new Tone.Synth().toDestination();
            break;
        case 'MonoSynth':
            synth = new Tone.MonoSynth().toDestination();
            break;
        case 'FMSynth':
            synth = new Tone.FMSynth().toDestination();
            break;
        case 'AMSynth':
            synth = new Tone.AMSynth().toDestination();
            break;
        default:
            synth = new Tone.Synth().toDestination();
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
                    </div>
                ) :
                (<button className='button-primary margin-top' onClick={() =>  setShowNotesPlayed(true)}>Show notes played</button>)}
        </div>
    );
}

export { Oscillator, Noise, Player, Microphone, Synth }