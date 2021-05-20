import * as Tone from "tone";
import React from 'react';

export default function Microphone(props) {
    let name = props.name;
    var mic;
    const recorder = new Tone.Recorder();

    var reverbAmount, chorusAmount, tremoloAmount, pitchAmount, pingPongAmount = 0

    const reverb = new Tone.Reverb().toDestination()
    const chorus = new Tone.Chorus().toDestination()
    const tremolo = new Tone.Tremolo().toDestination()
    const pitchShift = new Tone.PitchShift().toDestination()
    const pingPong = new Tone.PingPongDelay().toDestination()

    var player;
    var recording;

    function initMic() {
        if (!mic) {
            mic = new Tone.UserMedia()
            mic.open();
            mic.connect(recorder);
        }
    }

    function disposeMic() {
        if (mic) {
            mic.dispose();
            mic = null;
        }
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
            document.getElementById("record-button").innerText = '⚫'
            console.log("Recording stopped.");
        }
        return data
    }

    async function trigger() {
        if(!mic)
            initMic();

        recording = await record();

        if (recorder.state === 'stopped' && recording != null) {

            // Clear opened mic
            disposeMic();

            const url = URL.createObjectURL(recording);
            player = new Tone.Player(url).toDestination()
            applyEffects(player)

            player.autostart = true

            // Download button
            var oldButton = document.getElementById('download-button')
            var download_div = document.getElementById("download-div")

            // Remove old button if needed
            if (oldButton)
                download_div.removeChild(oldButton);

            var newButton = document.createElement("button");
            newButton.innerText = "Download";
            newButton.className = 'button-primary'
            newButton.id = 'download-button'
            newButton.addEventListener("click", function () {
                const anchor = document.createElement("a");
                let date = new Date()
                let download_name = 'rec_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getSeconds()
                anchor.download = `${download_name}.mp3`;
                anchor.href = url;
                anchor.click();
            }, { once: true })
            download_div.appendChild(newButton);
        }
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
                delayTime: pingPongAmount
            });
            player.connect(pingPong)
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
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { reverbAmount = e.currentTarget.value }} />
                </div>
                <div>
                    <label>Ping pong:</label>
                    <input name='volume' type='range' min='0' max='1' step='0.1' defaultValue='0' onChange={(e) => { pingPongAmount = e.currentTarget.value }} />
                </div>
                <div>
                    <label>Chorus:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { chorusAmount = e.currentTarget.value }} />
                </div>
                <div>
                    <label>Tremolo:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { tremoloAmount = e.currentTarget.value }} />
                </div>
                <div>
                    <label>Pitch shift:</label>
                    <input name='volume' type='range' min='0' max='10' step='1' defaultValue='0' onChange={(e) => { pitchAmount = e.currentTarget.value }} />
                </div>
                <div id='download-div'>
                </div>
            </div>
        </div>
    );
}