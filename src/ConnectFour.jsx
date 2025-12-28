import React from 'react';
import { useConnectFour } from './useConnectFour';
import './ConnectFour.css';

const ConnectFour = () => {
    const { gameState, actions, meta } = useConnectFour();
    const { board, next, gameOver, winner } = gameState;
    const { CONFIG } = meta;

    const getStatusMessage = () => {
        if (gameOver) {
            return winner === CONFIG.PLAYERS.BLUE ? "BLAU GEWINNT!" : "ROT GEWINNT!";
        }
        return next === CONFIG.PLAYERS.BLUE ? "Blau" : "Rot";
    };

    const getStatusColor = () => {
        if (gameOver) return winner === CONFIG.PLAYERS.BLUE ? "blue" : "red";
        return next === CONFIG.PLAYERS.BLUE ? "blue" : "red";
    };

    return (
        <div className="c4-container">
            <div className="title"><h1>Vier gewinnt</h1></div>

            <div className="game-layout">
                {/* Sidebar Controls */}
                <div className="controls">
                    <div className="status">
                        Nächster Zug: <br />
                        <span style={{ color: getStatusColor() }}>
              {getStatusMessage()}
            </span>
                    </div>

                    <div className="control-actions">
                        <button onClick={actions.resetGame}>Neues Spiel</button>
                        <button onClick={actions.undo}>Spielzug zurück</button>
                        <button onClick={actions.loadGame}>Spiel laden</button>
                        <button onClick={actions.saveGame}>Spiel speichern</button>
                        <button onClick={() => actions.doku('/connect4_react/docs/connect4_doc.html')}>Link zur Doku</button>
                    </div>

                    {meta.error && <div className="error-msg">{meta.error}</div>}
                </div>

                {/* Game Board */}
                <div className="board">
                    {board.map((row, y) => (
                        row.map((cell, x) => (
                            <div
                                key={`${y}-${x}`}
                                className="field"
                                onClick={() => actions.dropPiece(x)}
                                data-testid={`cell-${y}-${x}`}
                            >
                                {cell === CONFIG.PLAYERS.BLUE && <div className="piece blue" />}
                                {cell === CONFIG.PLAYERS.RED && <div className="piece red" />}
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectFour;