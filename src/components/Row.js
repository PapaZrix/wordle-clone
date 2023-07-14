export default function Row({ guess, currentGuess, mode }) {

    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => (
                    <div key={i} className={`${l.color} ${mode}`}>{l.key}</div>
                ))}
            </div>
        )
    }

    if (currentGuess) {
        const letters = currentGuess.split('')

        return (
            <div className="row current">
                {letters.map((letter, i) => (
                    <div key={i} className={`filled ${mode}`}>{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>
        )
    }

    return (
        <div className="row">
            <div className={mode}></div>
            <div className={mode}></div>
            <div className={mode}></div>
            <div className={mode}></div>
            <div className={mode}></div>
        </div>
    )
}