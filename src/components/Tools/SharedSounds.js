import React, { useEffect, useState } from 'react'
import axios from 'axios'
import playSound from '../utils/playSound'
import saveSound from '../utils/saveSound'

export default function SharedSounds(props) {
    const [sounds, setSounds] = useState([])
    const [filtered, setFiltered] = useState([])
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/sounds/getShared', {
            headers: { token: localStorage.getItem('token') }
        }).then((response) => {
            if (response.data.error)
                console.log(response.data.error)
            else {
                setSounds(response.data)
                setFiltered(response.data)
                console.log(response.data)
            }
        })
    }, [])

    function filterSounds(option, value) {
        if (value !== '-') {
            if (option === 'user') {
                setFiltered(sounds.filter((val) => {
                    return val.username === value
                }))
            }
            else if (option === 'instrument') {
                setFiltered(sounds.filter((val) => {
                    return val.instrument === value
                }))
            }
            else if (option === 'date') {
                setFiltered(sounds.filter((val) => {
                    let date1 = val.createdAt.toString().substr(0, 10)
                    let date2 = value.toString().substr(0, 10)
                    return date1 === date2
                }))
            }
        }
        else if (value === '-')
            setFiltered(sounds)
    }

    function getUsers() {
        let users = []
        sounds.forEach((sound) => {
            users.push(sound.username)
        })
        return [...new Set(users)];
    }

    function getInstruments() {
        let instruments = []
        sounds.forEach((sound) => {
            instruments.push(sound.instrument)
        })
        return [...new Set(instruments)];
    }

    function getDates() {
        let dates = []
        sounds.forEach((sound) => {
            dates.push(sound.createdAt.toString().substr(0, 10))
        })
        return [...new Set(dates)];
    }

    function getSound(sound_id) {
        axios.get(`http://localhost:3001/sounds/getSharedSound/${sound_id}`,
            {
                headers: { token: localStorage.getItem('token') },
            })
            .then((response) => {
                if (response.data.error)
                    console.log(response.data.error)
                else {
                    console.log(response.data)
                    let name = response.data.name
                    let instrument = response.data.instrument
                    let data = response.data.data
                    let effects = response.data.effects
                    saveSound(name, instrument, data, effects)
                }
            })
    }

    return (
        <div className='MySounds'>
            <h2>{props.name}</h2>
            <div className='Options'>
                <h3>Filter</h3>
                <div className='filters-container'>
                    <div className='filter'>
                        <label>Instrument:</label>
                        <select name="instrument" defaultValue='-' onChange={e => filterSounds('instrument', e.currentTarget.value)}>
                            <option value="-">-</option>
                            {getInstruments().map((instrument, i) =>
                                <option key={i} value={instrument}>{instrument}</option>
                            )}
                        </select>
                    </div>
                    <div className='filter'>
                        <label>User:</label>
                        <select name="user" onChange={e => filterSounds('user', e.currentTarget.value)}>
                            <option value="-">-</option>
                            {
                                getUsers().map((user, i) =>
                                    <option key={i} value={user}>{user}</option>
                                )}
                        </select>
                    </div>
                    <div className='filter'>
                        <label>Date:</label>
                        <select name="date" onChange={e => filterSounds('date', e.currentTarget.value)}>
                            <option value="-">-</option>
                            {
                                getDates().map((date, i) =>
                                    <option key={i} value={date}>{date}</option>
                                )}
                        </select>
                    </div>
                    <div className='filter'>
                        <label>Details:</label>
                        <input type='checkbox' onChange={() => setShowDetails(!showDetails)}></input>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>User</th>
                        <th>Instrument</th>
                        <th>Created</th>
                        {showDetails &&
                            <th>Details</th>}
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((sound) =>
                        <tr key={sound.id}>
                            <td>{sound.name}</td>
                            <td>{sound.username}</td>
                            <td>{sound.instrument}</td>
                            <td>{sound.createdAt.toString().substr(0, 10)}</td>
                            {showDetails &&
                                <td>{JSON.stringify(sound)}</td>}
                            <td>
                                <button className='button-primary' onClick={() => playSound(sound.instrument, sound.data, sound.effects)}>Play</button>
                                <button className='button-primary' onClick={() => getSound(sound.id)}>Save</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

