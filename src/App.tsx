/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import ThemeSelector from "./components/ThemeSelector";
import MultiSelect from "./components/MultiSelect";
import "./App.css";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const fretMarks = [2, 4, 6, 8, 11, 14, 16, 18, 20];
const scales: any = {
  Major: [0, 2, 4, 5, 7, 9, 11, 12],
  Minor: [0, 2, 3, 5, 7, 8, 10, 12],
  Dorian: [0, 2, 3, 5, 7, 9, 10, 12],
  Phrygian: [0, 1, 3, 5, 7, 8, 10, 12],
  Lydian: [0, 2, 4, 6, 7, 9, 11, 12],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10, 12],
  Locrian: [0, 1, 3, 5, 6, 8, 10, 12],
};

const fretsAmnt = [
  { value: 12, label: "12 frets" },
  { value: 16, label: "16 frets" },
  { value: 18, label: "18 frets" },
  { value: 22, label: "22 frets" },
  { value: 24, label: "24 frets" },
];

function App() {
  const [tunning, setTunning] = useState(["E", "B", "G", "D", "A", "E"]);
  const [fretsAmount, setFretsAmout] = useState(fretsAmnt[0]);
  const [rootScaleNote, setRootScaleNote] = useState("C");
  const [scaleType, setScaleType] = useState(Object.keys(scales)[0]);
  const [positionsToShow, setPositionsToShow] = useState([1, 2, 3, 4, 5, 6, 7]);

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
      for (let i = 1; i <= fretsAmount.value; i++) {
        const noteIndex = (startIndex + i) % notes.length;
        const note = notes[noteIndex];
        const noteScaleIndex = scaleNotes.indexOf(note) + 1;
        frets.push(
          <div
            key={i + Math.random()}
            className="fret"
            style={{
              animationDelay: i * 32 + "ms",
              filter: `opacity(${
                scaleNotes.includes(note) &&
                positionsToShow.includes(noteScaleIndex)
                  ? "100%"
                  : "8%"
              })`,
            }}
          >
            <span className="noteLabel">{note + " - " + noteScaleIndex}</span>
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
          style={{
            animationDelay: "0s",
          }}
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
          style={{
            animationDelay: "0.2s",
          }}
        >
          {Object.keys(scales).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="scale-select"
          value={fretsAmount.value}
          onChange={(e) =>
            setFretsAmout(
              fretsAmnt.filter((f) => f.value === parseInt(e.target.value))[0]
            )
          }
          style={{
            animationDelay: "0.3s",
          }}
        >
          {fretsAmnt.map((amount) => (
            <option key={amount.value} value={amount.value}>
              {amount.label}
            </option>
          ))}
        </select>
        <MultiSelect setPositionsToShow={setPositionsToShow} />
      </div>
      <div className="fretboard">
        <div className="tuner">
          {tunning.map((tune, index) => (
            <div className="tunnerContent">
              <div
                className="arrow"
                style={{ animationDelay: index * 64 + "ms" }}
              >
                {"\u2B95"}
              </div>

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
            </div>
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
        {Array.apply(null, Array(fretsAmount.value)).map((_note, i) => {
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
