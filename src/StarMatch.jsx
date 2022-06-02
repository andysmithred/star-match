import { useState } from "react";
import Game from "./Game"

// Note here we pass in the startNewGame prop, this will effectively unmount the Game component and 
// create a new Game component (giving it a new key / gameId). The new game component is a completely
// refreshed component stating from scratch (effectively the same as resetting the game)
const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
}

export default StarMatch;
