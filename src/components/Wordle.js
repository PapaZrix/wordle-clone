import { useEffect, useState } from "react"
import Grid from "./Grid"
import useFetch from "../hooks/useFetch"
import useWordle from "../hooks/useWordle"
import Keyboard from "./Keyboard"
import Modal from "./Modal"

export default function Wordle() {
    const { solution, getSolution } = useFetch()
    const { giveUp, newGame, handleKeyup, turn, isCorrect, currentGuess, guesses, handleClick } = useWordle(solution)
    const [showModal, setShowModal] = useState(false)
    const [savedSolution, setSavedSolution] = useState('')
    const [mode, setMode] = useState('light')

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        } else if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        } else {
            setShowModal(false)
        }

        return () => window.removeEventListener('keyup', handleKeyup)

    }, [handleKeyup, isCorrect, turn])

    useEffect(() => {
        getSolution()
    }, [isCorrect])

    useEffect(() => {
        if (turn > 5 && isCorrect === false) {
            setSavedSolution(solution)
            getSolution()
        }
    }, [isCorrect, turn])

    const changeMode = () => {
        if (mode === 'light') {
            document.body.style.backgroundColor = '#121212'
            setMode('dark')
        } else {
            document.body.style.backgroundColor = null
            setMode('light')
        }
    }

    return (
        <>
            <header>
                <div className="top">
                    <h1 className={mode}>Wordle</h1>
                    <div className={`mode ${mode}`}>
                        {mode === 'light' ? (
                            <span onClick={changeMode} className="material-symbols-outlined">
                                light_mode
                            </span>) : (
                            <span onClick={changeMode} className={`material-symbols-outlined ${mode}`}>
                                dark_mode </span>)
                        }
                    </div>
                </div>
                {turn > 0 && turn !== 6 && !(isCorrect) && (
                    <button onClick={giveUp} className={`give-up ${mode}`}>Give up</button>
                )}
            </header>
            <main>
                <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} mode={mode} />
                {isCorrect === true && (
                    <p className={`outcome ${mode}`}>You won! Congratulations</p>
                )}
                {turn === 6 && !(isCorrect) && (
                    <p className={`outcome ${mode}`}>You lost!</p>
                )}
                <Keyboard mode={mode} handleClick={handleClick} />
                {showModal && <Modal mode={mode} isCorrect={isCorrect} newGame={newGame} solution={savedSolution} turn={turn} />}
            </main>
        </>
    )
}