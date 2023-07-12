import { useEffect, useState } from "react"
import Grid from "./Grid"
import useFetch from "../hooks/useFetch"
import useWordle from "../hooks/useWordle"
import Keyboard from "./Keyboard"
import Modal from "./Modal"

export default function Wordle() {
    const { solution, getSolution } = useFetch()
    const { giveUp, newGame, handleKeyup, turn, isCorrect, currentGuess, guesses } = useWordle(solution)
    const [showModal, setShowModal] = useState(false)
    const [savedSolution, setSavedSolution] = useState('')

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

    }, [handleKeyup])

    useEffect(() => {
        getSolution()
    }, [isCorrect])

    useEffect(() => {
        if (turn > 5 && isCorrect === false) {
            setSavedSolution(solution)
            getSolution()
        }
    }, [isCorrect, turn])

    return (
        <>
            <header>
                {turn > 0 && turn !== 6 && !(isCorrect) && (
                    <button onClick={giveUp} className='give-up'>Give up</button>
                )}
                <p>Solution: {solution}</p>
            </header>
            <main>
                <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
                {isCorrect === true && (
                    <p className='outcome'>You won! Congratulations</p>
                )}
                {turn === 6 && !(isCorrect) && (
                    <p className='outcome'>You lost!</p>
                )}
                <Keyboard />
                {showModal && <Modal isCorrect={isCorrect} newGame={newGame} solution={savedSolution} turn={turn} />}
            </main>
        </>
    )
}