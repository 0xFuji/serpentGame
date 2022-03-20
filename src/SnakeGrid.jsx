// Create 12x12 full width grid of white squares
// Import useState hook from react
import React, { useState, useEffect } from "react";

function SnakeGrid() {
  const width = 12
  const height = 12
  const [grid, setGrid] = useState(Array(height).fill(Array(width).fill(0))); // Create 12x12 grid of empty squares (0)
  const [snake, setSnake] = useState([ // Create snake at start position
    [
      Math.floor((Math.random() * width) / 2 + width / 4), // Random start position within limited area
      Math.floor((Math.random() * height) / 2 + height / 4),
    ],
  ]);
  const [direction, setDirection] = useState(Math.floor(Math.random() * 4)); // Random start direction
  const [food, setFood] = useState([ // Create food at start position
    Math.floor(Math.random() * width),
    Math.floor(Math.random() * height),
  ]);
  const [score, setScore] = useState(0); // Set score to 0
  const [gameOver, setGameOver] = useState(false); // Set gameOver to false


  const checkBounds = () => {
    // Check if snake head is out of bounds
    if (
      snake[0][0] < 0 || // If snake head X is less than 0
      snake[0][0] >= width || // If snake head X is greater than or equal to grid width
      snake[0][1] < 0 || // If snake head Y is less than 0
      snake[0][1] >= height // If snake head Y is greater than or equal to grid height
    ) {
      setGameOver(true); // Set gameOver to true
      return true; // Return true, as snake is out of bounds
    }
    return false; // Return false, as snake is in bounds
  };

  const getBackground = (x, y) => {
    // Get background colour for a given square
    if (snake.some((coord) => coord[0] === x && coord[1] === y)) { // If X and Y coordinates are within the snake array
      return "bg-foreground-300"; // Return snake colour (Green/Foreground)
    }
    if (x === food[0] && y === food[1]) { // If X and Y coordinates are the same as food's X and Y coordinates
      return "bg-red-700"; // Return food colour (Red)
    }
    return "bg-background"; // If not in snake or food, return background colour (Orange)
  };

  const buildCube = (x, y) => {
    // Build a cube for a given coordinate
    let classNames = [ // Create array of class names, used to handle styles for cube's div
      getBackground(x, y), // Get background colour
      "w-full h-full text-center text-white font-bold text-2xl justify-center rounded", // Add cube's default classnames
    ];
    if (classNames[0] === "bg-foreground-300") { // If background colour is snake colour (Meaning it is a snake square)
      let index = snake.findIndex((coord) => coord[0] === x && coord[1] === y); // Find the index of the snake square in the snake array
      if ( // If the next snake segment is above the current snake segment
        index !== 0 &&
        snake[index - 1][0] === x &&
        snake[index - 1][1] === y - 1
      ) {
        classNames.push(
          "shadow-[0_-0.5rem_#6ba743] xl:shadow-[0_-1rem_#6ba743]"
        ); // Add shadow above cube (Effectively a top border to link to the previous segment)
      }
      if ( // If the next snake segment is below the current snake segment
        index !== 0 &&
        snake[index - 1][0] === x &&
        snake[index - 1][1] === y + 1
      ) {
        classNames.push(
            "shadow-[0_0.5rem_#6ba743] xl:shadow-[0_1rem_#6ba743]"
        ); // Add shadow below cube (Effectively a bottom border to link to the previous segment)
      }
      if ( // If the next snake segment is to the left of the current snake segment
        index !== 0 &&
        snake[index - 1][0] === x - 1 &&
        snake[index - 1][1] === y
      ) {
        classNames.push(
          "shadow-[-0.5rem_0_#6ba743] xl:shadow-[-1rem_0_#6ba743]"
        ); // Add shadow to the left of cube (Effectively a left border to link to the previous segment)
      }
      if ( // If the next snake segment is to the right of the current snake segment
        index !== 0 &&
        snake[index - 1][0] === x + 1 &&
        snake[index - 1][1] === y
      ) {
        classNames.push(
            "shadow-[0.5rem_0_#6ba743] xl:shadow-[1rem_0_#6ba743]"
        ); // Add shadow to the right of cube (Effectively a right border to link to the previous segment)
      }
    }
    return ( // Return cube
      <div className={classNames.join(" ")} key={`${x}-${y}`}>
        {snake[0][0] === x && snake[0][1] === y ? score : ""}
      </div>
    );
  };


  useEffect(() => {
    // useEffect interval to move the snake every (300-score*2)ms
    const interval = setInterval(() => {
      if (!checkBounds() && !gameOver) { // If snake is not out of bounds and game is not over
        if (snake[0][0] === food[0] && snake[0][1] === food[1]) { // If snake head is at food

          let newPosition = [ // Create new position for food
            Math.floor(Math.random() * width),
            Math.floor(Math.random() * height),
          ];

          while ( // While new position is within snake, generate new position. Stops food from being placed on snake
            snake.some(
              (coord) =>
                coord[0] === newPosition[0] && coord[1] === newPosition[1]
            )
          ) {
            newPosition = [
              Math.floor(Math.random() * width),
              Math.floor(Math.random() * height),
            ]; // Generate new position
          }

          setFood(newPosition); // Set new food position

          if (direction === 0) { // If snake is moving up
            setSnake([[snake[0][0], snake[0][1] + 1], ...snake]); // Add new snake segment to the top of the snake array
          } else if (direction === 1) { // If snake is moving right
            setSnake([[snake[0][0] + 1, snake[0][1]], ...snake]); // Add new snake segment to the right of the snake array
          } else if (direction === 2) { // If snake is moving down
            setSnake([[snake[0][0], snake[0][1] - 1], ...snake]); // Add new snake segment to the bottom of the snake array
          } else if (direction === 3) { // If snake is moving left
            setSnake([[snake[0][0] - 1, snake[0][1]], ...snake]); // Add new snake segment to the left of the snake array
          }

          setScore(score + 1); // Increase score by 1

        } else { // If snake head is not at food
          if (direction === 0) {  // If snake is moving up
            if ( // If snake head is colliding with snake segment
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] && coord[1] === snake[0][1] + 1
                )
            ) { 
              setGameOver(true); // Game is over
            } else { // If snake head is not colliding with snake segment
              setSnake([
                [snake[0][0], snake[0][1] + 1],
                ...snake.slice(0, snake.length - 1),
              ]); // Move snake forwards by 1 step
            }
          } else if (direction === 1) { // If snake is moving right
            if ( // If snake head is colliding with snake segment
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] + 1 && coord[1] === snake[0][1]
                )
            ) {
              setGameOver(true); // Game is over
            } else { // If snake head is not colliding with snake segment
              setSnake([
                [snake[0][0] + 1, snake[0][1]],
                ...snake.slice(0, snake.length - 1),
              ]); // Move snake forwards by 1 step
            }
          } else if (direction === 2) { // If snake is moving down
            if ( // If snake head is colliding with snake segment
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] && coord[1] === snake[0][1] - 1
                )
            ) {
              setGameOver(true); // Game is over
            } else { // If snake head is not colliding with snake segment
              setSnake([
                [snake[0][0], snake[0][1] - 1],
                ...snake.slice(0, snake.length - 1),
              ]); // Move snake forwards by 1 step
            }
          } else if (direction === 3) { // If snake is moving left
            if ( // If snake head is colliding with snake segment
              snake
                .slice(1)
                .some(
                  (coord) =>
                    coord[0] === snake[0][0] - 1 && coord[1] === snake[0][1]
                )
            ) {
              setGameOver(true); // Game is over
            } else { // If snake head is not colliding with snake segment
              setSnake([
                [snake[0][0] - 1, snake[0][1]],
                ...snake.slice(0, snake.length - 1),
              ]); // Move snake forwards by 1 step
            }
          }
        }
      }
    }, 300 - score * 2); // Move snake every (300-score*2)ms

    return () => clearInterval(interval); // Clear interval when component is unmounted
  }, [direction, snake, score, gameOver]); // Only re-run effect if direction, snake, score, or gameOver changes

  useEffect(() => {
      // useEffect to listen for arrow key presses
    const handleKeyDown = (e) => {
        // Function handles arrow key press events
      if (!gameOver) { // If game is not over
        // 37, Left (3)
        // 38, Up (2)
        // 39, Right (1)
        // 40, Down (0)
        if (e.keyCode === 37 && direction !== 1) { // If left arrow key is pressed and snake is not moving right
          setDirection(3); // Set direction to left
        } else if (e.keyCode === 38 && direction !== 0) { // If up arrow key is pressed and snake is not moving down
          setDirection(2); // Set direction to up
        } else if (e.keyCode === 39 && direction !== 3) { // If right arrow key is pressed and snake is not moving left
          setDirection(1); // Set direction to right
        } else if (e.keyCode === 40 && direction !== 2) { // If down arrow key is pressed and snake is not moving up
          setDirection(0); // Set direction to down
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown); // Listen for arrow key presses
    return () => document.removeEventListener("keydown", handleKeyDown); // Remove event listener when key is pressed (Would create duplicate listeners otherwise)
  }, [direction]); // Only re-run effect if direction changes

  return (
    <>
      <div
        className={`grid gap-1 xl:gap-2  grid-rows-12 grid-cols-12 w-full h-full p-3 auto-rows-fr`}
      >
        {grid.map((row, rowIndex) => (
          <>{row.map((_, colIndex) => buildCube(colIndex, rowIndex))}</>
        ))}
        { // If game is over, show modal
        gameOver ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                {/* Game over message and reload button */}
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
        ) : null}
      </div>
    </>
  );
}

export default SnakeGrid;
