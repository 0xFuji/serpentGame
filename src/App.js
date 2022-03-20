import { useState } from 'react';
import SnakeGrid from './SnakeGrid';

function App() {

  // make started state
  const [started, setStarted] = useState(false);
  return (
    <div className="bg-background h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-3">
          <h1 className="text-white text-5xl font-lexend">
            SERPENT
          </h1>
          <h2 className="text-white text-3xl font-mono">
            A shitty snake game.
          </h2>
        </div>
        <div className="w-9/12 md:w-6/12 lg:w-5/12 xl:w-4/12 aspect-square bg-background-light mb-3 rounded">
          {started ? <SnakeGrid/> : (
            <div className="flex flex-col items-center justify-center">
                <div className="text-white text-xl font-mono mt-16 mb-12">
                A classic snake game on a 12x12 grid.
                <ul className='list-disc text-lg'>
                  <li>
                    Use the arrow keys to change direction.
                  </li>
                  <li>
                    Hit the red squares (apples) to grow.
                  </li>
                  <li>
                    The game updates every (300-score*2)ms.
                  </li>
                </ul>
                </div>
                <button className="bg-background-dark text-white font-mono p-2 rounded" onClick={() => setStarted(true)}>
                  Start
                </button>
                </div>
          )}
        </div>
        <div className="flex flex-row justify-center">
          <div className="h-4 w-4 rounded-full bg-gray m-2 border-2 border-white"/>
          <div className="h-4 w-4 rounded-full bg-blue m-2 border-2 border-white"/>
          <div className="h-4 w-4 rounded-full bg-foreground-300 m-2 border-2 border-white"/>
        </div>
      </div>
    </div>
  );
}

export default App;
