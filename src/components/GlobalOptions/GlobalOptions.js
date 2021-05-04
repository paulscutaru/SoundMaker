import React, { useState } from 'react'
import * as Tone from "tone";
import './GlobalOptions.css'

export default function GlobalOptions() {
    const [muteIcon, setMuteIcon] = useState('🔈')

    function muteSounds() {
        if (Tone.getDestination().mute) {
            Tone.getDestination().mute = false
            setMuteIcon('🔈')
        }
        else {
            Tone.getDestination().mute = true
            setMuteIcon('🔇')
        }
    }

    return (
        <div className='GlobalOptions'>
            <button className='button-mute' onClick={muteSounds}>{muteIcon}</button>
        </div>
    )
}
