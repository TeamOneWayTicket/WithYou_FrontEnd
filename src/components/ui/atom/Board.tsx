import classnames from 'classnames';
import React, { memo, useMemo, useRef, useState } from 'react';

// the exported component can be either a function or a class

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const Board = ({ initialConfiguration, onSolveCallback }) => {
  const gameEnd = useRef(false);

  const [board, setBoard] = useState(() => {
    const _ret = [];
    for (let i = 0; i < initialConfiguration.length; i += 4) {
      const _row = initialConfiguration.slice(i, i + 4);
      _ret.push(_row);
    }
    return _ret;
  });

  const emptyCell = useMemo(() => {
    const _ret = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === 0) {
        const _xPos = i % 4;
        const _yPos = Math.floor(i / 4);
        _ret.push(_yPos);
        _ret.push(_xPos);
        break;
      }
    }
    return _ret;
  }, [board]);

  const onClickCell = (yPos, xPos) => {
    if (gameEnd.current) {
      alert('game already finished');
      return;
    }
    for (let i = 0; i < 4; i++) {
      const _nx = xPos + dx[i];
      const _ny = yPos + dy[i];
      if (_nx < 0 || _ny < 0 || _nx >= 4 || _ny >= 4) continue;
      if (emptyCell[0] !== _ny || emptyCell[1] !== _nx) continue;
      setBoard((prev) => {
        const _nextBoard = prev.map((prevRow) => [...prevRow]);
        _nextBoard[_ny][_nx] = _nextBoard[yPos][xPos];
        _nextBoard[yPos][xPos] = 0;
        return _nextBoard;
      });
      if (yPos === 3 && xPos === 3) {
        alert('Congratulations, you solved the puzzle');
        gameEnd.current = true;
      }
      return;
    }
    alert('impossible to move there');
  };
  return (
    <div className="board">
      {board.map((boardRow, boardRowIdx) =>
        boardRow.map((boardCol, boardColIdx) => {
          if (boardCol === 0) return <div className="empty" />;
          return (
            <div
              key={`${boardRowIdx}-${boardColIdx}`}
              className="tile"
              onClick={() => onClickCell(boardRowIdx, boardColIdx)}
            >
              {boardCol}
            </div>
          );
        })
      )}
    </div>
  );
};

export default memo(Board);
