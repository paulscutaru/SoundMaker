import * as Tone from "tone";
import React from 'react';

export default function Microphone(props) {
    let name = props.name;
    const mic = new Tone.UserMedia();
    const recorder = new Tone.Recorder();
    var player;
    var recording;

    mic.connect(recorder);

    if (mic.state === 'stopped') {
        mic.open().then(() => {
            console.log("Mic opened.");
        }).catch(e => {
            // rejected when the user doesn't have or allow mic access
            console.log("Mic open rejected.");
        });
    }


    async function record() {
        Tone.context.resume();
        var data;
        if (recorder.state === 'stopped') {
            recorder.start()
            console.log("Recording started.")
        }
        else if (recorder.state === 'started') {
            data = await recorder.stop()
            console.log("Recording stopped.");
        }
        return data
    }

    async function trigger() {
        recording = await record()

        if (recorder.state === 'stopped') {
            player = new Tone.Player(URL.createObjectURL(recording)).toDestination()
            player.autostart = true
        }
    }

    return (
        <div>
            <h2>{name}</h2>
            <button className="play-button" onClick={trigger}>⚫</button>
        </div>
    );
}