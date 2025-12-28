import { useState, useCallback } from 'react';

// --- Constants & Types ---
const CONFIG = {
    ROWS: 6,
    COLS: 7,
    STORAGE_KEY: "C4_GAME_STATE",
    PLAYERS: { BLUE: 'b', RED: 'r' }
};
// --- Where the history is stored ---


const INITIAL_STATE = {
    board: Array(CONFIG.ROWS).fill(null).map(() => Array(CONFIG.COLS).fill('')),
    next: CONFIG.PLAYERS.BLUE,
    gameOver: false,
    winner: null
};
let history = [INITIAL_STATE];

// --- Storage Service ---
const StorageService = {
    save: (state, history) => {
        //Pack state and History together
        const pack = [state,history];
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(pack));
            return { success: true };
        } catch (e) {
            console.error("Storage Save Failed:", e);
            return { success: false, error: e.message };
        }
    },
    load: () => {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (!stored) throw new Error("Kein gespeichertes Spiel gefunden.");
            return { success: true, data: JSON.parse(stored) };
        } catch (e) {
            console.error("Storage Load Failed:", e);
            return { success: false, error: e.message };
        }
    }
};

// --- Win Detection Algorithm ---
const checkWin = (board, player) => {
    // Horizontal
    for (let r = 0; r < CONFIG.ROWS; r++) {
        for (let c = 0; c <= CONFIG.COLS - 4; c++) {
            if (board[r][c] === player && board[r][c+1] === player && board[r][c+2] === player && board[r][c+3] === player) return true;
        }
    }
    // Vertical
    for (let c = 0; c < CONFIG.COLS; c++) {
        for (let r = 0; r <= CONFIG.ROWS - 4; r++) {
            if (board[r][c] === player && board[r+1][c] === player && board[r+2][c] === player && board[r+3][c] === player) return true;
        }
    }
    // Diagonal Down-Right
    for (let r = 0; r <= CONFIG.ROWS - 4; r++) {
        for (let c = 0; c <= CONFIG.COLS - 4; c++) {
            if (board[r][c] === player && board[r+1][c+1] === player && board[r+2][c+2] === player && board[r+3][c+3] === player) return true;
        }
    }
    // Diagonal Up-Right
    for (let r = 3; r < CONFIG.ROWS; r++) {
        for (let c = 0; c <= CONFIG.COLS - 4; c++) {
            if (board[r][c] === player && board[r-1][c+1] === player && board[r-2][c+2] === player && board[r-3][c+3] === player) return true;
        }
    }
    return false;
};

// --- Custom Hook ---
export const useConnectFour = () => {
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);


    const dropPiece = useCallback((colIndex) => {
        if (gameState.gameOver) return;

        setGameState(prev => {
            const newBoard = prev.board.map(row => [...row]);
            let placed = false;

            // Gravity logic
            for (let y = CONFIG.ROWS - 1; y >= 0; y--) {
                if (newBoard[y][colIndex] === '') {
                    newBoard[y][colIndex] = prev.next;
                    placed = true;
                    break;
                }
            }

            if (!placed) return prev; // Column full

            const isWin = checkWin(newBoard, prev.next);

            if (history[history.length <= 0 ? INITIAL_STATE : history.length-1 ].board !== prev.board) {
                history.push(prev);
            }

            return {
                board: newBoard,
                next: isWin ? prev.next : (prev.next === CONFIG.PLAYERS.BLUE ? CONFIG.PLAYERS.RED : CONFIG.PLAYERS.BLUE),
                gameOver: isWin,
                winner: isWin ? prev.next : null
            };
        });
    }, [gameState.gameOver]);

    const resetGame = () => {
        setGameState(INITIAL_STATE);
        history = [INITIAL_STATE];
        setError(null);
    };

    const saveGame = () => {
        const result = StorageService.save(gameState, history);
        if (!result.success) setError("Spielspeicherung ist fehlgeschlagen.");
        else alert("Spiel wurde gespeichert.");
    };

    const loadGame = () => {
        const result = StorageService.load();
        if (result.success) {
            setGameState(result.data[0]);
            history = result.data[1];
            setError(null);
        } else {
            setError(result.error);
        }
    };

    const undo = () => {
        if(history.length > 1) {
            let previousState = history.pop();
            setGameState((previousState));
        }
        else{
            setGameState(INITIAL_STATE);
        }


    }

    // open documentation in a new tab
    const doku = useCallback((url = '/docs/connect4_doc.html') => {
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
            setError(null);
        } catch (e) {
            console.error('Open doc failed', e);
            setError('Konnte die Dokumentation nicht öffnen.');
        }
    }, []);

    return {
        gameState,
        actions: { dropPiece, resetGame, saveGame, loadGame, undo, doku },
        meta: { error, CONFIG }
    };
};