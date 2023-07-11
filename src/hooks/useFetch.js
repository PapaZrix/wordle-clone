import { useState } from "react"

export default function useFetch() {
    const [solution, setSolution] = useState('')

    const getSolution = async () => {
        const res = await fetch('db.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const data = await res.json()
        setSolution(data.words[Math.round(Math.random() * data.words.length - 1)].toLowerCase())
    }

    return { getSolution, solution }
}