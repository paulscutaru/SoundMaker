import * as Tone from "tone";
import React, { useState } from 'react';

export default function Microphone(props) {
    let name = props.name;
    const mic = new Tone.UserMedia();
    const recorder = new Tone.Recorder();

    var reverbAmount, crusherAmount, chorusAmount, tremoloAmount, pitchAmount, pingPongAmount = 0

    const [isFileReady, setIsFileReady] = useState(false)

    const reverb = new Tone.Reverb().toDestination()
    const crusher = new Tone.BitCrusher().toDestination()
    const chorus = new Tone.Chorus().toDestination()
    const tremolo = new Tone.Tremolo().toDestination()
    const pitchShift = new Tone.PitchShift().toDestination()
    const pingPong = new Tone.PingPongDelay().toDestination()

    var player;
    var recording;
    var listener = false;

    mic.connect(recorder);


    if (mic.state === 'stopped') {
        mic.open().then(() => {
            console.log("Mic opened.");
        }).catch(e => {
            console.log("Mic open rejected.");
        });
    }


    async function record() {
        var data = null;
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
            reverb.set({
                decay: reverbAmount
            })
            player.connect(reverb)
        }
        if (chorusAmount > 0) {
            chorus.start()
            chorus.set({
                delayTime: chorusAmount,
                depth: chorusAmount
            })
            player.connect(chorus)
        }
        if (crusherAmount > 0) {
            crusher.set({
                bits: crusherAmount
            })
            player.connect(crusher)
        }
        if (tremoloAmount > 0) {
            tremolo.start()
            tremolo.set({
                frequency: tremoloAmount * 200,
                depth: 0.9
            });
            player.connect(tremolo)
        }
        if (pitchAmount > 0) {
            pitchShift.set({
                pitch: pitchAmount
            });
            player.connect(pitchShift)
        }
        if (pingPongAmount > 0) {
            pingPong.set({
                delayTime: pingPongAmount / 10
            });
            player.connect(pingPong)
        }
    }

    async function trigger() {
        recording = await record()

        if (recorder.state === 'stopped' && recording != null) {
            const url = URL.createObjectURL(recording);
            player = new Tone.Player(url).toDestination()
            applyEffects(player)
            const toneMeter = new Tone.Meter();
            player.connect(toneMeter);

            const toneFFT = new Tone.FFT();
            player.connect(toneFFT);

            const toneWaveform = new Tone.Waveform();
            player.connect(toneWaveform);

            
            player.autostart = true

            if (listener === false) {
                listener = true
                var button = document.getElementById("download-button");
                button.addEventListener("click", function () {
                    const anchor = document.createElement("a");
                    let date = new Date()
                    let download_name = 'rec_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
                    anchor.download = `${download_name}.mp3`;
                    anchor.href = url;
                    anchor.click();

                });
                URL.revokeObjectURL(url)
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
                <h3>Effects</h3>
                <div>
                    <label>Reverb:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { reverbAmount = e.target.value }} />
                </div>
                <div>
                    <label>Ping pong:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { pingPongAmount = e.target.value }} />
                </div>
                <div>
                    <label>Chorus:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { chorusAmount = e.target.value }} />
                </div>
                <div>
                    <label>Tremolo:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { tremoloAmount = e.target.value }} />
                </div>
                <div>
                    <label>Pitch shift:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { pitchAmount = e.target.value }} />
                </div>
                <div>
                    <label>Crusher:</label>
                    <input name='volume' type='range' min='0' max='5' step='1' defaultValue='0' onChange={(e) => { crusherAmount = e.target.value }} />
                </div>
                <div className='margin-top'>
                    {isFileReady ?
                        (
                            <button id="download-button" className="button-primary" >Download recordings</button>
                        ) :
                        (<p>Record a sound!</p>)
                    }
                </div>

            </div>
        </div>
    );
}