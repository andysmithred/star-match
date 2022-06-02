
// Note the use of in line react styles, great way of dealing with dynamic styles
const PlayAgain = props => (
    <div className="game-done">
        <div 
            className="message"
            style={{ color: props.gameStatus === 'lost' ? 'red' : 'green'}}
        >
            {props.gameStatus === 'lost' ? 'Too bad' : 'Nice one'}
        </div>
        <button onClick={props.onClick}>Play Again</button>
    </div>
)

export default PlayAgain;
