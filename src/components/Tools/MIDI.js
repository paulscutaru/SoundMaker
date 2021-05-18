import React from 'react'
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";

export default function MIDI(props) {
    var synths = [];
    var currentMidi = null;
    var isPlaying = false;

    const loadMIDI = (e) => {
        var reader = new FileReader();
        var file = e.currentTarget.files[0];
        if (file) {
            reader.onload = function (e) {
                const midi = new Midi(e.currentTarget.result);
                currentMidi = midi;
                document.getElementById('midi_info').innerHTML=JSON.stringify(currentMidi,undefined,2)
            };
            reader.readAsArrayBuffer(file);
            
        }
    }

    function trigger() {
        var midi_button = document.getElementById('midi_button')

        if (!isPlaying && currentMidi) {
            isPlaying = true;
            const now = Tone.now() + 0.1;

            console.log(currentMidi.tracks);
            midi_button.innerHTML = 'Playing...';

            currentMidi.tracks.forEach((track, i) => {
                const synth = new Tone.PolySynth(Tone.Synth, {
                    envelope: {
                        attack: 0.02,
                        decay: 0.1,
                        sustain: 0.4,
                        release: 1,
                    },
                }).toDestination();
                synths.push(synth);

                track.notes.forEach((note) => {
                    synth.triggerAttackRelease(
                        note.name,
                        note.duration,
                        note.time + now,
                        note.velocity
                    );
                });
            });
        } else if (isPlaying && currentMidi) {
            isPlaying = false;
            midi_button.innerHTML = '⚫'
            while (synths.length) {
                var synth = synths.shift();
                if (!synth.disposed)
                    synth.disconnect()
            }
        }
        else{
            alert('Upload a MIDI file first!')
        }
    }

    return (
        <div className='midi'>
            <h2>{props.name}</h2>
            <label>Upload MIDI file:</label>
            <input type='file' accept='.mid' onChange={loadMIDI}></input>
            <button className="play-button" id='midi_button' onMouseDown={trigger}>⚫</button>
            <p className='midi-info' id='midi_info'></p>
        </div>
    )
}
