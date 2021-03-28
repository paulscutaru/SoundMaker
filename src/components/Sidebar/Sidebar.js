import React from 'react'
import './Sidebar.css'
import { SidebarData } from './SidebarData'

export default function Sidebar(props) {

    function handleInstrumentChange(newInstrument) {
        props.onClick(newInstrument);
    }

    return (
        <div className='Sidebar' name={props.name} onChange={handleInstrumentChange}>
            <h2>Instruments</h2>
            <ul className='SidebarList'>
                {SidebarData.map((item, key) => {
                    return (
                        <li key={key}>
                            <h3 className='SidebarItemTitle'>{item.title}</h3>
                            <ul className='SidebarList'>
                                {item.content.map((contentItem) =>
                                    <li key={contentItem.name} className='SidebarDropdown' onClick={() => handleInstrumentChange(contentItem.name)}>{contentItem.name}</li>
                                )}
                            </ul>
                        </li>

                    )
                })}
            </ul>
        </div>
    )
}
