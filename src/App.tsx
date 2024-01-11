/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import ThemeSelector from "./components/ThemeSelector";
import "./App.css";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const fretMarks = [2, 4, 6, 8, 11, 14, 16, 18, 20];
const notesLength = 22;
const scales: any = {
  Major: [0, 2, 4, 5, 7, 9, 11, 12],
  Minor: [0, 2, 3, 5, 7, 8, 10, 12],
};

function App() {
  const [tunning, setTunning] = useState(["E", "B", "G", "D", "A", "E"]);
  const [rootScaleNote, setRootScaleNote] = useState("C");
  const [scaleType, setScaleType] = useState(Object.keys(scales)[0]);

  const getScaleNotes = (root: string, scaleType: any) => {
    const rootIndex = notes.indexOf(root);
    return scales[scaleType].map(
      (interval: number) => notes[(rootIndex + interval) % notes.length]
    );
  };

  const renderFretboard = () => {
    const scaleNotes = getScaleNotes(rootScaleNote, scaleType);
    return tunning.map((stringNote) => {
      const startIndex = notes.indexOf(stringNote);
      const frets = [];
      for (let i = 1; i <= notesLength; i++) {
        const noteIndex = (startIndex + i) % notes.length;
        const note = notes[noteIndex];
        frets.push(
          <div
            key={i + Math.random()}
            className="fret"
            style={{
              animationDelay: i * 32 + "ms",
              filter: `opacity(${scaleNotes.includes(note) ? "100%" : "8%"})`,
            }}
          >
            {note}
          </div>
        );
      }

      return (
        <div key={stringNote + Math.random()} className="string">
          {frets}
        </div>
      );
    });
  };

  useEffect(() => {
    renderFretboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tunning, rootScaleNote, scaleType]);

  return (
    <div className="App">
      <h1 className="title">
        HNDRX<span className="dot">.</span>
      </h1>
      <ThemeSelector />
      <div className="menu">
        <select
          className="scale-select"
          onChange={(e) => setRootScaleNote(e.target.value)}
          value={rootScaleNote}
        >
          {notes.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>
        <select
          className="scale-select"
          onChange={(e) => setScaleType(e.target.value)}
          value={scaleType}
        >
          {Object.keys(scales).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="fretboard">
        <div className="tuner">
          {tunning.map((tune, index) => (
            <select
              className={
                getScaleNotes(rootScaleNote, scaleType).includes(tune)
                  ? "tunner-select colored"
                  : "tunner-select"
              }
              key={index}
              onChange={(e) => {
                const newTuning = [...tunning];
                newTuning[index] = e.target.value;
                setTunning(newTuning);
              }}
              value={tune}
              style={{ animationDelay: index * 64 + "ms" }}
            >
              {notes.map((note) => (
                <option
                  key={note}
                  value={note}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {note}
                </option>
              ))}
            </select>
          ))}
        </div>
        <div className="separator"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>{renderFretboard()}</div>
        </div>
      </div>
      <div className="frets-mark">
        {/* eslint-disable-next-line prefer-spread */}
        {Array.apply(null, Array(notesLength)).map((_note, i) => {
          return (
            <div
              key={i + Math.random()}
              className="fret-mark"
              style={{
                animationDelay: i * 32 + "ms",
                filter: `opacity(${fretMarks.includes(i) ? "100%" : "0%"})`,
              }}
            >
              {i === 11 ? "\u26AA \u26AA" : "\u26AA"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
