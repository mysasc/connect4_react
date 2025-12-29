/** * @module ConnectFour
 * View-Komponente für das Spielfeld und die Steuerung.
 */
import React from 'react';
import { useConnectFour } from './useConnectFour';
import './ConnectFour.css';

/**
 * Kern-UI-Komponente zur Darstellung des Spielzustands.
 * Nutzt useConnectFour Hook für die Geschäftslogik.
 */
const ConnectFour = () => {
    const { gameState, actions, meta } = useConnectFour();
    const { board, next, gameOver, winner } = gameState;
    const { CONFIG } = meta;

    /** Status-Text-Ermittlung basierend auf gameOver-Status */
    const getStatusMessage = () => {
        if (gameOver) {
            return winner === CONFIG.PLAYERS.BLUE ? "BLAU GEWINNT!" : "ROT GEWINNT!";
        }
        return next === CONFIG.PLAYERS.BLUE ? "Blau" : "Rot";
    };

    /** Farbe für UI-Status-Indikator */
    const getStatusColor = () => {
        if (gameOver) return winner === CONFIG.PLAYERS.BLUE ? "blue" : "red";
        return next === CONFIG.PLAYERS.BLUE ? "blue" : "red";
    };

    return (
        <div className="c4-container">
            <div className="title"><h1>Vier gewinnt</h1></div>

            <div className="game-layout">
                {/* Seitenleiste: Status und Systemsteuerung */}
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

                    {/* Fehlerausgabe aus dem Meta-State */}
                    {meta.error && <div className="error-msg">{meta.error}</div>}
                </div>

                {/* Spielfeld-Matrix-Rendering */}
                <div className="board">
                    {board.map((row, y) => (
                        row.map((cell, x) => (
                            <div
                                key={`${y}-${x}`}
                                className="field"
                                onClick={() => actions.dropPiece(x)}
                                data-testid={`cell-${y}-${x}`}
                            >
                                {/* Bedingtes Rendering der Spielsteine */}
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