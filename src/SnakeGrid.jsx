// Create 12x12 full width grid of white squares
// Import useState hook from react
import React, { useState, useEffect } from "react";

function SnakeGrid({ width, height }) {
  // Create a state variable for the grid, 12 x 12 with default value of 0
  const [grid, setGrid] = useState(Array(height).fill(Array(width).fill(0)));
  // Create a state variable for the snake, with a random starting position
  const [snake, setSnake] = useState([
    [
      Math.floor((Math.random() * width) / 2 + width / 4),
      Math.floor((Math.random() * height) / 2 + height / 4),
    ],
  ]);
  // Create a state variable for the snake direction, with a random starting direction
  const [direction, setDirection] = useState(Math.floor(Math.random() * 4));
  // Create a state variable for the food, with a random starting position
  const [food, setFood] = useState([
    Math.floor(Math.random() * width),
    Math.floor(Math.random() * height),
  ]);
  // Create a state variable for the score, with a default value of 0
  const [score, setScore] = useState(0);
  // Create a state variable for the game over, with a default value of false
  const [gameOver, setGameOver] = useState(false);

  // Create a function to check if the snake is out of bounds
  const checkBounds = () => {
    // Check if the snake head is out of bounds
    if (
      snake[0][0] < 0 ||
      snake[0][0] >= width ||
      snake[0][1] < 0 ||
      snake[0][1] >= height
    ) {
      // Set the game over state to true
      setGameOver(true);
      return true;
    }
    return false;
  };

  // Create a function to check coordinates of snake and food and return correct background
  const getBackground = (x, y) => {
    // Check if the coordinates are part of the snake
    if (snake.some((coord) => coord[0] === x && coord[1] === y)) {
      // Return the snake background
      return "bg-foreground-300";
    }
    // Check if the coordinates are food
    if (x === food[0] && y === food[1]) {
      // Return the food background
      return "bg-red-700";
    }
    // Return the background for the grid
    return "bg-background";
  };

  // Create a function to build each cube
  const buildCube = (x, y) => {
    // Return a div with the correct background, also centre text content vertically and horizontally
    let classNames = [
      getBackground(x, y),
      "w-full h-full text-center text-white font-bold text-2xl justify-center rounded",
    ];
    // Check if current cube is a snake with classNames
    if (classNames[0] === "bg-foreground-300") {
      // get index of block in snake
      let index = snake.findIndex((coord) => coord[0] === x && coord[1] === y);
      // check if next index is above current x,y
      if (
        index !== 0 &&
        snake[index - 1][0] === x &&
        snake[index - 1][1] === y - 1
      ) {
        // add classNames to cube
        classNames.push(
          "shadow-[0_-0.5rem_#6ba743] xl:shadow-[0_-1rem_#6ba743]"
        );
      }
      // check if next index is below current x,y
      if (
        index !== 0 &&
        snake[index - 1][0] === x &&
        snake[index - 1][1] === y + 1
      ) {
        // add classNames to cube
        classNames.push("shadow-[0_0.5rem_#6ba743] xl:shadow-[0_1rem_#6ba743]");
      }
      // check if next index is left of current x,y
      if (
        index !== 0 &&
        snake[index - 1][0] === x - 1 &&
        snake[index - 1][1] === y
      ) {
        // add classNames to cube
        classNames.push(
          "shadow-[-0.5rem_0_#6ba743] xl:shadow-[-1rem_0_#6ba743]"
        );
      }
      // check if next index is right of current x,y
      if (
        index !== 0 &&
        snake[index - 1][0] === x + 1 &&
        snake[index - 1][1] === y
      ) {
        // add classNames to cube
        classNames.push("shadow-[0.5rem_0_#6ba743] xl:shadow-[1rem_0_#6ba743]");
      }
      // round corners that aren't next to snake
      if (
        index !== 0 &&
        snake[index - 1][0] !== x - 1 &&
        snake[index - 1][0] !== x + 1 &&
        snake[index - 1][1] !== y - 1 &&
        snake[index - 1][1] !== y + 1
      ) {
        classNames.push("rounded-lg");
      }
    }
    return (
      <div className={classNames.join(" ")} key={`${x}-${y}`}>
        {snake[0][0] === x && snake[0][1] === y ? score : ""}
      </div>
    );
  };

  // useEffect interval to move the snake every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      // Check if the snake is out of bounds
      if (!checkBounds() && !gameOver) {
        // Check if the snake has eaten the food
        if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
          // Add a new food to the grid that is not in the snakes coordinates list
          let newPosition = [
            Math.floor(Math.random() * width),
            Math.floor(Math.random() * height),
          ];
          while (
            snake.some(
              (coord) =>
                coord[0] === newPosition[0] && coord[1] === newPosition[1]
            )
          ) {
            newPosition = [
              Math.floor(Math.random() * width),
              Math.floor(Math.random() * height),
            ];
          }
          setFood(newPosition);
          // Add a new segment to the snake
          if (direction === 0) {
            setSnake([[snake[0][0], snake[0][1] + 1], ...snake]);
          } else if (direction === 1) {
            setSnake([[snake[0][0] + 1, snake[0][1]], ...snake]);
          } else if (direction === 2) {
            setSnake([[snake[0][0], snake[0][1] - 1], ...snake]);
          } else if (direction === 3) {
            setSnake([[snake[0][0] - 1, snake[0][1]], ...snake]);
          }
          // Add a point to the score
          setScore(score + 1);
        } else {
          if (direction === 0) {
            // check if snake is going to hit itself
            if (
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] && coord[1] === snake[0][1] + 1
                )
            ) {
              // Set the game over state to true
              setGameOver(true);
            } else {
              // Add a new segment to the snake
              setSnake([
                [snake[0][0], snake[0][1] + 1],
                ...snake.slice(0, snake.length - 1),
              ]);
            }
          } else if (direction === 1) {
            // check if snake is going to hit itself
            if (
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] + 1 && coord[1] === snake[0][1]
                )
            ) {
              // Set the game over state to true
              setGameOver(true);
            } else {
              // Add a new segment to the snake
              setSnake([
                [snake[0][0] + 1, snake[0][1]],
                ...snake.slice(0, snake.length - 1),
              ]);
            }
          } else if (direction === 2) {
            // check if snake is going to hit itself
            if (
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] && coord[1] === snake[0][1] - 1
                )
            ) {
              // Set the game over state to true
              setGameOver(true);
            } else {
              // Add a new segment to the snake
              setSnake([
                [snake[0][0], snake[0][1] - 1],
                ...snake.slice(0, snake.length - 1),
              ]);
            }
          } else if (direction === 3) {
            // check if snake is going to hit itself
            if (
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] - 1 && coord[1] === snake[0][1]
                )
            ) {
              // Set the game over state to true
              setGameOver(true);
            } else {
              // Add a new segment to the snake
              setSnake([
                [snake[0][0] - 1, snake[0][1]],
                ...snake.slice(0, snake.length - 1),
              ]);
            }
          }
        }
      } // make interval decrease with score
    }, 300 - score * 2);

    return () => clearInterval(interval);
  }, [direction, snake, score, gameOver]);

  // detect arrow key presses and change direction
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameOver) {
        // 37, Left (3)
        // 38, Up (2)
        // 39, Right (1)
        // 40, Down (0)
        if (e.keyCode === 37 && direction !== 1) {
          setDirection(3);
        } else if (e.keyCode === 38 && direction !== 0) {
          setDirection(2);
        } else if (e.keyCode === 39 && direction !== 3) {
          setDirection(1);
        } else if (e.keyCode === 40 && direction !== 2) {
          setDirection(0);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <>
      <div
        className={`grid gap-1 xl:gap-2  grid-rows-${height} grid-cols-${width} w-full h-full p-3 auto-rows-fr`}
      >
        {grid.map((row, rowIndex) => (
          <>{row.map((_, colIndex) => buildCube(colIndex, rowIndex))}</>
        ))}
        {
          /* Show modal with button to reload page if game over */
          gameOver ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                  {/* Game over message */}
                  <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex-auto p-5">
                      <h1 className="text-2xl font-semibold">Game Over</h1>
                      <p className="mt-3 text-gray-700">
                        You scored {score} points.
                      </p>
                      <p className="mt-3 text-gray-700">
                        Press the button below to play again.
                      </p>
                    </div>
                    <div className="flex items-center justify-end p-2 bg-gray-200 rounded-b">
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Play Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null
        }
      </div>
    </>
  );
}

export default SnakeGrid;
