import React, { useState } from 'react';

export default function Player(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        var file = event.target.files[0]
        setSelectedFile(file)
        setIsSelected(true)
        document.getElementById('audio').setAttribute('src', URL.createObjectURL(file));
        console.log('Selected file in player: ', file.name)
    };

    let name = props.name;
    return (
        <div className='margin-top'>
            <h2>{name}</h2>
            <input type="file" name="file" accept='.mp3' onChange={changeHandler} />
            {isSelected ? (
                <div className='file-info'>
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
            <div>
                <audio id="audio" controls />
            </div>
            <div className='Options'>
                <h3>Options</h3>
                <div className='margin-top'>
                    <button className='button-primary'>Save sound</button>
                </div>
            </div>
        </div>
    );
}