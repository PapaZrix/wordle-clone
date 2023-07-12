import keys from '../keys'

export default function Keyboard() {

    return (
        <div className="keyboard">
            <div className='k-row'>
                {keys.map((k, i) => {
                    return i < 10 ? <div key={i} className={`key ${k.color}`}>{k.key}</div> : null
                })}

            </div>
            <div className='k-row'>
                {keys.map((k, i) => {
                    return i > 9 && i < 19 ? <div key={i} className={`key ${k.color}`}>{k.key}</div> : null
                })}
            </div>
            <div className='k-row'>
                {keys.map((k, i) => {
                    return i > 18 ? <div key={i} className={`key ${k.color}`}>{k.key}</div> : null
                })}
            </div>
        </div>
    )
}