// STAR MATCH - Starting Template

import { useState } from "react";
import utils from './utils';
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";
import StarsDisplay from "./StarsDisplay";

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsDone = availableNums.length === 0;

    const numberStatus = number => {
        console.log('numberStatus: ', number);

        if (!availableNums.includes(number)) {
          console.log('numberStatus => returning: used');
            return 'used';
        }
        if (candidateNums.includes(number)) {
          console.log('numberStatus => returning: ', candidatesAreWrong ? 'wrong': 'candidate');
            return candidatesAreWrong ? 'wrong': 'candidate'; 
        }

        console.log('numberStatus => returning: available');
        return 'available';
    }

    const onNumberClick = (number, currentStatus) => {

      console.log('IN --> onNumberClick: ', number, currentStatus);

      if (currentStatus === 'used') {
        console.log('OUT --> onNumberClick: used');
        return;
      }

      const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(n => n !== number);

      if (utils.sum(newCandidateNums) !== stars) {
        // incorrect answer so far
        setCandidateNums(newCandidateNums);
      } else {
        const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));

        setStars(utils.randomSumIn(newAvailableNums, 9));
        setAvailableNums(newAvailableNums);
        setCandidateNums([]);
      }
    }

    const resetGame = () => {
      setStars(utils.random(1, 9));
      setAvailableNums(utils.range(1, 9));
      setCandidateNums([]);
    }

    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameIsDone ? <PlayAgain onClick={resetGame} /> : <StarsDisplay count={stars} />}
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
        <div className="timer">Time Remaining: 10</div>
      </div>
    );
  };
  
  export default StarMatch;
  