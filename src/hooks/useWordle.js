import { useState } from "react";
import keys from "../keys";

export default function useWordle(solution) {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [isCorrect, setIsCorrect] = useState(false)

    const formatGuess = () => {
        const solutionLetters = [...solution]
        const formatedGuess = [...currentGuess].map(l => {
            return { key: l, color: 'gray' }
        })

        formatedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formatedGuess[i].color = 'green'

                const pos = keys.map(k => k.key).indexOf(l.key)
                keys[pos].color = 'green'
            }
        })

        formatedGuess.forEach((l, i) => {
            if (solutionLetters.includes(l.key) && l.color !== 'green') {
                formatedGuess[i].color = 'yellow'

                const pos = keys.map(k => k.key).indexOf(l.key)
                if (keys[pos].color !== 'green' && l.color !== 'green' && l.color !== 'gray') {
                    keys[pos].color = 'yellow'
                }
            }
        })

        formatedGuess.forEach((l) => {
            const pos = keys.map(key => key.key).indexOf(l.key)
            if (keys[pos].color !== 'green' && keys[pos].color !== 'yellow') {
                keys[pos].color = 'gray'
            }
        })

        return formatedGuess
    }

    const addNewGuess = (formatedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses(prevGuesses => {
            const newGuess = [...prevGuesses]
            newGuess[turn] = formatedGuess
            return newGuess
        })

        setTurn(prevTurn => {
            return prevTurn + 1
        })

        setCurrentGuess('')
    }

    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) {
                console.log('No more guesses')
                return
            }

            if (guesses.includes(currentGuess)) {
                console.log('You have already tried that word')
                return
            }

            if (currentGuess.length !== 5) {
                console.log('Please enter full word')
                return
            }

            const formatedGuess = formatGuess()
            addNewGuess(formatedGuess)
        }

        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }
    }

    const handleClick = ({ target }) => {
        if (target.textContent === 'enter') {
            if (turn > 5) {
                console.log('No more guesses')
                return
            }

            if (guesses.includes(currentGuess)) {
                console.log('You have already tried that word')
                return
            }

            if (currentGuess.length !== 5) {
                console.log('Please enter full word')
                return
            }

            const formatedGuess = formatGuess()
            addNewGuess(formatedGuess)
        }

        if (target.textContent === 'del') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }

        if (/^[A-Za-z]$/.test(target.textContent)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + target.textContent)
            }
        }
    }

    const giveUp = () => {
        setTurn(6)
        setIsCorrect(false)
    }

    const newGame = () => {
        setGuesses([...Array(6)])
        setCurrentGuess('')
        setTurn(0)
        setIsCorrect(false)

        keys.forEach(k => {
            k.color = 'white'
        })
    }

    return { giveUp, newGame, handleKeyup, turn, currentGuess, guesses, isCorrect, handleClick }
}