import * as Tone from "tone";
import React, { useState } from 'react';

export default function Player(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    //const [playerTime, setPlayerTime] = useState('0');
    //const [playerVolume, setPlayerVolume] = useState('-6');

    var player = new Tone.Player().toDestination()
    var buffer;

    function trigger() {
        if (isSelected) {
            buffer = new Tone.Buffer(URL.createObjectURL(selectedFile), function () {
                if (player.state === 'stopped') {
                    player.buffer = buffer
                    player.start()
                }
                else if (player.state === 'started') {
                    player.stop()
                }

                console.log('Player state:', player.state)
            });
        }
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
        console.log('Selected file in player: ', event.target.files[0].name)
    };

    let name = props.name;
    return (
        <div className='margin-top'>
            <h2>{name}</h2>
            <input type="file" name="file" accept='.mp3' onChange={changeHandler} />
            {isSelected ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size: {selectedFile.size / 1000000} megabytes</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div className='player-container margin-top'>
                <button className="play-button" onClick={trigger}>⚫</button>
            </div>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <button className='button-primary'>Save sound</button>
                    <button className='button-primary'>Download</button>
                </div>
            </div>
        </div>
    );
}