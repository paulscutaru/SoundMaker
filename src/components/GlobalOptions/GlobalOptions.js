import React, { useState } from 'react'
import * as Tone from "tone";
import './GlobalOptions.css'

export default function GlobalOptions() {
    const [muteIcon, setMuteIcon] = useState('🔈')

    function muteSounds() {
        if (Tone.Destination.mute) {
            Tone.Destination.mute = false
            setMuteIcon('🔈')
        }
        else {
            Tone.Destination.mute = true
            setMuteIcon('🔇')
        }
    }

    return (
        <div className='GlobalOptions'>
            <button className='button-mute' onClick={muteSounds}>{muteIcon}</button>
        </div>
    )
}
