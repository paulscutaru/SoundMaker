import React from 'react'
import './Sidebar.css'
import { SidebarData } from './SidebarData'

export default function Sidebar(props) {

    function handleToolChange(newInstrument) {
        props.onClick(newInstrument);
    }

    return (
        <div className='Sidebar' name={props.name} onChange={handleToolChange}>
            <h2>Instruments</h2>
            <ul className='SidebarList'>
                {SidebarData.map((item, key) => {
                    return (
                        <li key={key}>
                            <h3 className='SidebarItemTitle'>{item.title}</h3>
                            <ul className='SidebarList'>
                                {item.content.map((contentItem) =>
                                    <li key={contentItem.name} className='SidebarDropdown' onClick={() => handleToolChange(contentItem.name)}>{contentItem.name}</li>
                                )}
                            </ul>
                        </li>

                    )
                })}
            </ul>
        </div>
    )
}
