import React from 'react';

export default function Sequencer(props) {

    let name = props.name

    return (
        <div className='margin-top'>
            <h2>{name}</h2>
        </div>
    )
}