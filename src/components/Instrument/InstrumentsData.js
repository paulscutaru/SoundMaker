import * as Tone from "tone";
import React, { useState} from 'react';
import getNotesBetween from "../utils/getNotesBetween";

function Oscillator(props) {
    const oscillator = new Tone.Oscillator().toDestination();
    function trigger() {
        oscillator.start();
    }

    function stop() {
        oscillator.stop();
    }

    let name = props.name;
    return (
        <div>
            <h2>{name}</h2>
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop}>⚫</button>
        </div>
    );
}

function Noise(props) {
    const noise = new Tone.Noise().toDestination();

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
            <button className="play-button" onMouseDown={trigger} onMouseUp={stop}>⚫</button>
        </div>
    );

}

function Player(props) {
    let player;

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    function trigger() {
        if (isSelected)
            player = new Tone.Player(selectedFile.name).toDestination()
        player.autostart = true;
        console.log('Selected file in player: ', selectedFile.name)
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    let name = props.name;
    return (
        <div>
            <h2>{name}</h2>
            <input type="file" name="file" onChange={changeHandler} />
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


    const getTilesButtons = () => {
        const notes = getNotesBetween('C3', 'B5')
        var tile_class = 'tile'

        return notes.map((note) => {
            if (note.includes('#'))
                tile_class = 'tile_sharp'
            else
                tile_class = 'tile'

            return <button key={note} className={tile_class} onMouseDown={() => playNote(note)}></button>
        })

    }

    function playNote(note) {
        synth.triggerAttackRelease(`${note}`, "6n");
    }

    return (
        <div className="piano-container">
            <h2>{name}</h2>
            <div className="tiles-wrapper">
                {getTilesButtons()}
            </div>
        </div>
    );
}

export { Oscillator, Noise, Player, Microphone, Synth }