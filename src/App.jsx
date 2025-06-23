import { useState } from 'react';
import './App.css';

function App() {
  const numberRange = Array.from({ length: 13 }, (_, i) => i); // 0–12
  const bonusOptions = [2, 4, 6, 8, 10];

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedBonuses, setSelectedBonuses] = useState([]);
  const [doubleBonus, setDoubleBonus] = useState(false);
  const [score, setScore] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false); // NEW

  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 7) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const toggleBonus = (bonus) => {
    if (selectedBonuses.includes(bonus)) {
      setSelectedBonuses(selectedBonuses.filter((b) => b !== bonus));
    } else {
      setSelectedBonuses([...selectedBonuses, bonus]);
    }
  };

  const handleSubmit = () => {
    let baseSum = selectedNumbers.reduce((sum, n) => sum + n, 0);
    if (doubleBonus) baseSum *= 2;

    const bonusSum = selectedBonuses.reduce((sum, b) => sum + b, 0);
    const extra15 = selectedNumbers.length === 7 ? 15 : 0;

    const roundScore = baseSum + bonusSum + extra15;

    setScore((prev) => prev + roundScore);

    // Reset selections (keep score)
    setSelectedNumbers([]);
    setSelectedBonuses([]);
    setDoubleBonus(false);
  };

  const confirmReset = () => {
    setSelectedNumbers([]);
    setSelectedBonuses([]);
    setDoubleBonus(false);
    setScore(0);
    setShowResetConfirm(false); // Close modal
  };

  return (
    <div className="App">
      <h1>Total: {score}</h1>

      <div className="button-grid">
        {numberRange.map((num) => (
          <button
            key={num}
            onClick={() => toggleNumber(num)}
            className={selectedNumbers.includes(num) ? 'btn selected' : 'btn'}
          >
            {num}
          </button>
        ))}
      </div>

      <h2>Bonus Cards</h2>
      <div className="button-grid">
        {bonusOptions.map((b) => (
          <button
            key={b}
            onClick={() => toggleBonus(b)}
            className={selectedBonuses.includes(b) ? 'btn bonus-selected' : 'btn'}
          >
            +{b}
          </button>
        ))}
      </div>

      <button
        onClick={() => setDoubleBonus(!doubleBonus)}
        className={doubleBonus ? 'btn double-selected' : 'btn'}
        style={{ margin: '10px 0' }}
      >
        x2 Multiplier
      </button>

      <div className="button-row">
        <button onClick={() => setShowResetConfirm(true)} className="btn action">Reset</button>
        <button onClick={handleSubmit} className="btn action">Submit</button>
      </div>


      {showResetConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Are you sure you want to reset your score?</p>
            <div className="modal-buttons">
              <button onClick={confirmReset} className="btn confirm">Yes, Reset</button>
              <button onClick={() => setShowResetConfirm(false)} className="btn cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
