import React, { useState } from "react";
import * as Tone from "tone";
import classNames from "classnames";

const CHOSEN_OCTAVE = "4";

function GenerateGrid() {
    const grid = [];
    for (let i = 0; i < 16; i++) {
        let column = [
            { note: "C", isActive: false },
            { note: "D", isActive: false },
            { note: "E", isActive: false },
            { note: "F", isActive: false },
            { note: "G", isActive: false },
            { note: "A", isActive: false },
            { note: "B", isActive: false }
        ];
        grid.push(column);
    }
    return grid;
}

export default function Sequencer(props) {
    const [grid, setGrid] = useState(GenerateGrid());

    const [bpm, setBpm] = useState('90')

    // Boolean to handle if music is played or not
    const [isPlaying, setIsPlaying] = useState(false);

    // Used to visualize which column is making sound
    const [currentColumn, setCurrentColumn] = useState(null);

    //Notice the new PolySynth in use here, to support multiple notes at once
    const synth = new Tone.PolySynth().toDestination();

    Tone.getTransport().bpm.value = bpm

    // Updates our Grid's state
    // Written to be intelligble, not performant
    function handleNoteClick(clickedColumn, clickedNote) {
        // Shallow copy of our grid with updated isActive
        let updatedGrid = grid.map((column, columnIndex) =>
            column.map((cell, cellIndex) => {
                let cellCopy = cell;

                // Flip isActive for the clicked note-cell in our grid
                if (columnIndex === clickedColumn && cellIndex === clickedNote) {
                    cellCopy.isActive = !cell.isActive;
                }

                return cellCopy;
            })
        );

        //Updates the grid with the new note toggled
        setGrid(updatedGrid);
    }

    function PlayMusic() {
        let melody = []

        grid.forEach((column) => {
            let columnNotes = [];
            column.forEach(
                (shouldPlay) =>
                    //If isActive, push the given note, with our chosen octave
                    shouldPlay.isActive &&
                    columnNotes.push(shouldPlay.note + CHOSEN_OCTAVE)
            );
            melody.push(columnNotes);
        });


        const Sequencer = new Tone.Sequence(
            (time, column) => {
                // Highlight column with styling
                setCurrentColumn(column);

                //Sends the active note to our PolySynth
                synth.triggerAttackRelease(melody[column], "8n", time);
            },
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "8n"
        );

        if (isPlaying) {
            // Turn of our player if music is currently playing
            setIsPlaying(false);
            setCurrentColumn(null);

            Tone.getTransport().stop();
            Sequencer.stop();
            Sequencer.clear();
            Sequencer.dispose();
            Tone.context.dispose()
            Tone.setContext(new AudioContext())
        }
        else {
            setIsPlaying(true);
            Sequencer.start();
            Tone.getTransport().start();
        }
    };

    return (
        <div className="Sequencer" >
            <h2>{props.name}</h2>
            <div className="notes-wrapper">
                {grid.map((column, columnIndex) => (
                    <div
                        className={classNames("notes-column", {
                            "notes-column-active": currentColumn === columnIndex
                        })}
                        key={columnIndex + "column"}
                    >
                        {column.map(({ note, isActive }, noteIndex) => (
                            <NoteButton
                                note={note}
                                isActive={isActive}
                                onClick={() => handleNoteClick(columnIndex, noteIndex)}
                                key={note + columnIndex}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <label>BPM:{bpm}</label>
                <input type='range' min='20' max='300' defaultValue={bpm} onChange={e => setBpm(e.currentTarget.value)}></input>
            </div>
            <button className="button-primary" onClick={() => PlayMusic()}>
                {isPlaying ? "Stop" : "Play"}
            </button>
        </div>
    );
}

function NoteButton({ note, isActive, ...rest }) {
    const class_name = isActive ? "note note-active" : "note";
    return (
        <button className={class_name} {...rest}>
            {note}
        </button>
    );
};
