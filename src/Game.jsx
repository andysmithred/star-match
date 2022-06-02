// STAR MATCH - Starting Template


import utils from './utils';
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";
import StarsDisplay from "./StarsDisplay";
import useGameState from './useGameState';

const Game = (props) => {
    
    // deconstruct the useGameState hook
    const { stars, availableNums, candidateNums, secondsLeft, setGameState } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0 ?
      'won' : 
      secondsLeft === 0 ? 'lost' : 'active';

    const numberStatus = number => {

        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong': 'candidate'; 
        }

        return 'available';
    }

    const onNumberClick = (number, currentStatus) => {

      if (gameStatus !== 'active' || currentStatus === 'used') {
        return;
      }

      const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(n => n !== number);
      setGameState(newCandidateNums); 
    }

    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            { gameStatus !== 'active' ? (
                <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
              ) : (
                <StarsDisplay count={stars} />
              )}
          </div>
          <div className="right">
              {utils.range(1, 9).map(n => 
                <PlayNumber 
                  key={n} 
                  status={numberStatus(n)} 
                  number={n} 
                  onClick={onNumberClick} 
                />
              )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };
  
  export default Game;
  