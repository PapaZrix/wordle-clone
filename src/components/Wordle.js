import { useEffect, useState } from "react"
import Grid from "./Grid"
import useFetch from "../hooks/useFetch"
import useWordle from "../hooks/useWordle"

export default function Wordle() {
    const { solution, getSolution } = useFetch()
    const { giveUp, newGame, handleKeyup, turn, isCorrect, currentGuess, guesses } = useWordle(solution)
    const [savedSolution, setSavedSolution] = useState('')

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

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

            </header>
            <main>
                <Grid />
            </main>
        </>
    )
}