import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

interface MultiSelectProps {
  setPositionsToShow: (positions: number[]) => void;
}

const options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
];

const MultiSelect: React.FC<MultiSelectProps> = ({ setPositionsToShow }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = (value: string) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelectedOptions);
    setPositionsToShow(newSelectedOptions.map((option) => parseInt(option)));
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const numberToRoman: { [key: string]: string } = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI",
    "7": "VII",
  };

  return (
    <div ref={dropdownRef} className={styles.container}>
      <button className={styles.button} onClick={toggleDropdown}>
        Show Notes
      </button>
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 10000000000000000,
            backgroundColor: "var(--background-color)",
            border: "1px solid var(--background)",
            padding: "0.25rem",
            borderRadius: "0.25rem",
            color: "black",
            width: "8rem",
            top: "3rem",
          }}
        >
          {options.map((option) => (
            <div key={option.value}>
              <label className={styles.label}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option.value.toString())}
                  onChange={() => handleOptionChange(option.value.toString())}
                />
                {`Note ${numberToRoman[option.label]}`}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
