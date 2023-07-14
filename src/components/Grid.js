import Row from "./Row";

export default function Grid({ guesses, currentGuess, turn, mode }) {
    return (
        <div className="grid">
            {guesses.map((g, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} mode={mode} turn={turn} />
                }
                return <Row key={i} guess={g} mode={mode} />
            })}
        </div>
    )
}