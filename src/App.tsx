import { useState, useEffect } from 'react';
import './App.css';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const notesLength = notes.length;
const scales = {
    "Major": [0, 2, 4, 5, 7, 9, 11,12],
    "Minor": [0,2,3,5,7,8,10,12]
};

function App() {
    const [tunning, setTunning] = useState(['E', 'B', 'G', 'D', 'A', 'E'])
    const [rootScaleNote, setRootScaleNote] = useState("C")
    const [scaleType, setScaleType] = useState("Major")

    const getScaleNotes = (root, scaleType) => {
        const rootIndex = notes.indexOf(root);
        return scales[scaleType].map(interval => notes[(rootIndex + interval) % notesLength]);
    };

    const renderFretboard = () => {
        const scaleNotes = getScaleNotes(rootScaleNote, scaleType);
        return tunning.map((stringNote) => {
            const startIndex = notes.indexOf(stringNote);
            const frets = [];
            for (let i = 1; i <= notesLength; i++) {
                const noteIndex = (startIndex + i) % notesLength;
                const note = notes[noteIndex];
                frets.push(
                    <div key={i} className="fret" style={{ animationDelay: i * 32 + "ms", filter: `opacity(${scaleNotes.includes(note) ? "100%" : "16%"})` }}>
                        {note}
                    </div>
                );
            }

            return (
                <div key={stringNote} className="string">
                    {frets}
                </div>
            );
        });
    };

    useEffect(() => renderFretboard, [tunning, rootScaleNote, scaleType]);

    return (
        <div className="App">
            <h1>Fretboard</h1>
            <div>
                <select className="scale-select" onChange={(e) => setRootScaleNote(e.target.value)} value={rootScaleNote}>
                    {notes.map(note => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
                <select className="scale-select" onChange={(e) => setScaleType(e.target.value)} value={scaleType}>
                    {Object.keys(scales).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="fretboard">
                <div className="tuner">
                    {tunning.map((tune, index) => (
                        <select className="tunner-select" key={index} onChange={e => {
                            let newTuning = [...tunning];
                            newTuning[index] = e.target.value;
                            setTunning(newTuning);
                        }} value={tune}>
                            {notes.map(note => (
                                <option key={note} value={note}>{note}</option>
                            ))}
                        </select>
                    ))}
                </div>
                <div>
                    {renderFretboard()}
                </div>
            </div>
        </div>
    );
}

export default App;

