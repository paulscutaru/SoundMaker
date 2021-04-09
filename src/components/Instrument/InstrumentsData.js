import * as Tone from "tone";
import React, { useState } from 'react';
import getNotesBetween from "../utils/getNotesBetween";

function Oscillator(props) {
    const [oscFrequency, setOscFrequency] = useState('440');
    const [oscDetune, setOscDetune] = useState('0');
    const [oscType, setOscType] = useState('sine');
    const [oscVolume, setOscVolume] = useState('-6');

    const oscillator = new Tone.Oscillator({
        frequency: oscFrequency,
        detune: oscDetune,
        type: oscType,
        volume: oscVolume
    }).toDestination();

    const updateFrequency = (event) => {
        if (event.target.value !== null && event.target.value !== '')
            setOscFrequency(event.target.value);
        else
            setOscFrequency(0);
    }

    const updateDetune = (event) => {
        if (event.target.value !== '-')
            setOscDetune(event.target.value);
    }

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
                    <input name='frequency' type='number' min='20' max='4000' value={oscFrequency} onChange={updateFrequency} />
                </div>
                <div className='margin-top'>
                    <label>Detune:</label>
                    <input name='detune' type='number' min='-4000' max='4000' value={oscDetune} onChange={updateDetune} />
                </div>
                <div className='margin-top'>
                    <label>Type:</label>
                    <select name="oscType" value={oscType} onChange={e => setOscType(e.target.value)}>
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div className='margin-top'>
                    <label>Volume:</label>
                    <input name='volume' type='range' min='-12' max='12' value={oscVolume} onChange={e => setOscVolume(e.target.value)} />
                </div>
            </div>
        </div>
    );
}

function Noise(props) {
    const [noiseType, setNoiseType] = useState('white');
    const [noiseFadeIn, setNoiseFadeIn] = useState('0');
    const [noiseFadeOut, setNoiseFadeOut] = useState('0');
    const [noiseRate, setNoiseRate] = useState('1');
    const [noiseVolume, setNoiseVolume] = useState('-6');


    const noise = new Tone.Noise({
        type: noiseType,
        fadeIn: noiseFadeIn,
        fadeOut: noiseFadeOut,
        playbackRate: noiseRate,
        volume: noiseVolume
    }).toDestination();

    const updateNoiseFadeIn = (event) => {
        if (event.target.value !== null && event.target.value !== '')
            setNoiseFadeIn(event.target.value);
        else
            setNoiseFadeIn(0);
    }

    const updateNoiseFadeOut = (event) => {
        if (event.target.value !== null && event.target.value !== '')
            setNoiseFadeOut(event.target.value);
        else
            setNoiseFadeOut(0);
    }


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
                    <select name="noiseType" value={noiseType} onChange={e => setNoiseType(e.target.value)}>
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                        <option value="pink">Pink</option>
                    </select>
                    <div className='margin-top'>
                        <label>Playback rate:</label>
                        <input name='noiseRate' type='number' min='1' max='40' value={noiseRate} onChange={e => setNoiseRate(e.target.value)} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade In:</label>
                        <input name='fadeIn' type='number' min='0' max='40' value={noiseFadeIn} onChange={updateNoiseFadeIn} />
                    </div>
                    <div className='margin-top'>
                        <label>Fade Out:</label>
                        <input name='fadeOut' type='number' min='0' max='40' value={noiseFadeOut} onChange={updateNoiseFadeOut} />
                    </div>
                    <div className='margin-top'>
                        <label>Volume:</label>
                        <input name='volume' type='range' min='-12' max='12' value={noiseVolume} onChange={e => setNoiseVolume(e.target.value)} />
                    </div>
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
    var [notesPlayed, setNotesPlayed] = useState([])

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
                        <button className='button-primary margin-top' onClick={() => setNotesPlayed([])}>Clear</button>
                    </div>
                ) :
                (
                    <button className='button-primary margin-top' onClick={() => setShowNotesPlayed(true)}>Show notes played</button>
                )
            }
        </div>
    );
}

export { Oscillator, Noise, Player, Microphone, Synth }