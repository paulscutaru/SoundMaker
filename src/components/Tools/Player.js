/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

export default function Player(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [init, setInit] = useState(false)
    const WIDTH = 330, HEIGHT = 120;

    var context = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement, audioSrc, analyser, bufferLength, dataArray, canvas, canvasCtx;

    useEffect(() => {
        if (selectedFile) {
            if (init) {
                // Delete old player
                audioElement = document.getElementById('audio');
                document.getElementById('audio-div').removeChild(audioElement)
            }
            setInit(true)

            audioElement = document.createElement('audio');
            audioElement.id = 'audio';
            audioElement.controls = 'controls';
            audioElement.type = 'audio/mpeg';
            document.getElementById('audio-div').appendChild(audioElement);

            audioSrc = context.createMediaElementSource(audioElement);
            analyser = context.createAnalyser()

            canvas = document.getElementById('waveform-canvas');
            canvasCtx = canvas.getContext("2d");

            analyser.fftSize = 2048;
            audioSrc.connect(analyser);
            audioSrc.connect(context.destination);

            bufferLength = analyser.fftSize;
            dataArray = new Uint8Array(bufferLength);
            audioElement.src = URL.createObjectURL(selectedFile)
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            function draw() {

                requestAnimationFrame(draw);

                analyser.getByteTimeDomainData(dataArray);

                canvasCtx.fillStyle = 'rgb(218, 218, 218)';
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

                canvasCtx.beginPath();

                var sliceWidth = WIDTH * 1.0 / bufferLength;
                var x = 0;

                for (var i = 0; i < bufferLength; i++) {

                    var v = dataArray[i] / 128.0;
                    var y = v * HEIGHT / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();
            };

            draw();
        }
    });

    const changeHandler = (e) => {
        var file = e.currentTarget.files[0]
        setSelectedFile(file)
        console.log('Selected file in player: ', file.name)
    };

    let name = props.name;
    return (
        <div>
            <h2>{name}</h2>
            <div className='player-container'>
                <input type="file" name="file" accept='.mp3' onChange={changeHandler} />
                {selectedFile ? (
                    <div className='file-info'>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} megabytes</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>

                    </div>

                ) : (
                    <p>Select a file to show details</p>
                )}
                <div id='audio-div'>
                </div>
                <div>
                    <canvas id='waveform-canvas' className='canvas' width={WIDTH} height={HEIGHT}>

                    </canvas>
                </div>
            </div>
        </div>
    );
}