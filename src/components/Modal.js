import { FaTrophy } from 'react-icons/fa'

export default function Modal({ solution, turn, isCorrect, newGame, mode }) {

    return (
        <div className='modal'>
            <div className={`modal-container ${mode}`}>
                {isCorrect && (
                    <>
                        <p className='modal-message'>You Won!</p>
                        <div className='win'>
                            <FaTrophy />
                            {turn === 1 ? (
                                <>
                                    <p style={{ margin: '0.5rem 0' }}>You found the solution in <br></br>{turn} guess</p>
                                    <button onClick={newGame} className="new-game">New Game</button>
                                </>
                            ) : (
                                <>
                                    <p style={{ margin: '0.5rem 0' }}>You found the solution in <br></br>{turn} guesses</p>
                                    <button onClick={newGame} className="new-game">New Game</button>
                                </>
                            )}
                        </div>
                    </>
                )}
                {!isCorrect && (
                    <>
                        <p className='modal-message'>You Lost!</p>
                        <div className="modal-solution-container">
                            <p>The answer was:</p>
                            <span className="modal-solution">{solution}</span>
                        </div>
                        <div className='btn-div'>
                            <button onClick={newGame} className="new-game">New Game</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}