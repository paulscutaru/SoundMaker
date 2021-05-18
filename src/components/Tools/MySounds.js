import React, { useEffect, useState } from 'react'
import axios from 'axios'
import playSound from '../utils/playSound'

export default function MySounds(props) {
    const [sounds, setSounds] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/sounds/get', {
            headers: { token: localStorage.getItem('token') }
        }).then((response) => {
            if (response.data.error)
                console.log(response.data.error)
            else {
                setSounds(response.data)
                console.log(response.data)
            }
        })
    }, [])

    function deleteSound(sound_id) {
        axios.delete(`http://localhost:3001/sounds/${sound_id}`, {
            headers: { token: localStorage.getItem('token') },
        })
            .then((response) => {
                if (response.data.error)
                    console.log(response.data.error)
                else {
                    setSounds(sounds.filter((val) => {
                        return val.id !== sound_id
                    }))
                    console.log(response.data)
                }
            })
    }

    return (
        <div className='MySounds'>
            <h2>{props.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>User</th>
                        <th>Instrument</th>
                        <th>Description</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {sounds.map((sound) =>
                        <tr key={sound.id}>
                            <td>{sound.name}</td>
                            <td>{sound.username}</td>
                            <td>{sound.instrument}</td>
                            <td>{sound.description ? (sound.description) : ('none')}</td>
                            <td>
                                <button className='button-primary' onClick={() => playSound(sound.instrument, sound.data, sound.effects)}>Play</button>
                                <button className='button-primary' >Share</button>
                                <button className='button-primary' onClick={() => deleteSound(sound.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

