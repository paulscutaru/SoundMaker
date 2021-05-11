import React from 'react'
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import { AMOscillator } from 'tone';

export default function MIDI() {
    var synths = [];
    var currentMidi = null;
    var isPlaying = false, effects = false;

    const loadMIDI = (e) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            const midi = new Midi(e.currentTarget.result);
            currentMidi = midi;
        };
        reader.readAsArrayBuffer(e.currentTarget.files[0]);
    }

    function trigger() {
        if (!isPlaying && currentMidi) {
            isPlaying = true;
            const now = Tone.now() + 0.1;

            console.log(currentMidi.tracks);
            currentMidi.tracks.forEach((track, i) => {
                const synth = new Tone.PolySynth(Tone.FMSynth, {
                    envelope: {
                        attack: 0.02,
                        decay: 0.1,
                        sustain: 0.3,
                        release: 1,
                    },
                }).toDestination();
                if (effects) {
                    const reverb = new Tone.Reverb('2').toDestination();
                    const ping = new Tone.PingPongDelay('0.3').toDestination();
                    synth.chain(ping, reverb)
                }
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
        } else {
            isPlaying = false;
            while (synths.length) {
                var synth = synths.shift();
                if (!synth.disposed)
                    synth.disconnect()
            }
        }
    }

    return (
        <div className='Options'>
            <label>Upload MIDI file:</label>
            <input type='file' onChange={loadMIDI}></input>
            <button className="play-button" onMouseDown={trigger}>▶</button>
            <label for="effects">Effects</label>
            <input type="checkbox" id="effects" name="effects"/>
        </div>
    )
}
