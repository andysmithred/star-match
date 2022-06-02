
import { useEffect, useState } from "react";
import utils from "./utils";

// this is a custom hook
// here the state of the app is managed, in a separate custom hook
// custom practice is to use 'use'
const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    // this is another react hook to do side affects, note: good practice is to always clean up the side effect afterwards by returning a cleanup callback
    useEffect(() => {
      if (secondsLeft > 0 && availableNums.length > 0) {
        const timerId = setTimeout(() => {
          setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);  // here we return a callback to clean up the effect, essentially clean up the timeout
      }
    })

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            // incorrect answer so far, so we just have candidate nums (which will be blue)
            setCandidateNums(newCandidateNums);
        } else {
            // have a valid answer, remove the nums from the available nums
            const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));

            // and then reset the stars with a new value, reset the available nums and set candidate nums to nothing as starting anew
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return { stars, availableNums, candidateNums, secondsLeft, setGameState };
}

export default useGameState;
