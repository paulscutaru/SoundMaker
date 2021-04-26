import * as Tone from "tone";
import React, { useState } from 'react';

export default function Microphone(props) {
    let name = props.name;
    const mic = new Tone.UserMedia();
    const recorder = new Tone.Recorder();

    const [reverbAmount, setReverbAmount] = useState(0)
    const [isFileReady, setIsFileReady] = useState(false)

    const reverb = new Tone.Reverb().toDestination()

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
            document.getElementById("record-button").innerText = 'Recording...'
            console.log("Recording started.")
        }
        else if (recorder.state === 'started') {
            data = await recorder.stop()
            setIsFileReady(true)
            document.getElementById("record-button").innerText = '⚫'
            console.log("Recording stopped.");
        }
        return data
    }

    function applyEffects(player) {
        if (reverbAmount > 0) {
            reverb.decay = reverbAmount
            player.connect(reverb)
        }
        else
            reverb.disconnect()
    }

    async function trigger() {
        recording = await record()

        if (recorder.state === 'stopped') {
            const url = URL.createObjectURL(recording);
            player = new Tone.Player(url).toDestination()
            applyEffects(player)
            player.autostart = true

            if (isFileReady) {
                var button = document.getElementById("download-button");
                button.innerHTML = 'Download file';
                button.addEventListener("click", function () {
                    const anchor = document.createElement("a");
                    let date = new Date()
                    let today = date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
                    anchor.download = `${today}.mp3`;
                    anchor.href = url;
                    anchor.click();
                });
            }
        }
    }


    return (
        <div>
            <h2>{name}</h2>
            <div className="margin-top">
                <button id="record-button" className="play-button" onClick={trigger}>⚫</button>
            </div>
            <div className='Options'>
                <h3>Options</h3>
                <div>
                    <label>Reverb:</label>
                    <input name='volume' type='range' min='0' max='20' step='1' value={reverbAmount} onChange={e => setReverbAmount(e.target.value)} />
                </div>
                <div className='margin-top'>
                    {isFileReady ?
                        (
                            <button id="download-button" className="button-primary" >Download file</button>
                        ) :
                        (<p>Record a sound!</p>)
                    }
                    <button className='button-primary'>Save sound</button>
                </div>

            </div>
        </div>
    );
}