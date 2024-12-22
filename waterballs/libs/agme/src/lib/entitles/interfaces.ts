export interface Card {
    toString: () => string;
    equals: (other: any) => boolean;
}

export interface Deck<T extends Card> {
    shuffle: () => void;
    drawCard: () => T;
    addCard: (card: T) => void;
    getCards: () => T[];
}

export interface Game<T extends Card> {
    setPlayers: (players: Player<T>[]) => void;
    start: () => void;
    playRound: () => void;
    dealInitialCards: () => void;
    getCurrentCard: () => T | null;
    getCurrentPlayer: () => Player<T>;
    getWinner: () => Player<T> | null;
    getPlayers: () => Player<T>[];
    getDeck: () => Deck<T>;
    drawCard: () => void;
    getTableCards: () => T[];
    getRounds: () => number;
    getMaxRounds: () => number | undefined;
    getInitialCardCount: () => number;
}

export interface Deck<T extends Card> {
    getCards: () => T[];
    shuffle: () => void;
    drawCard: () => T;
    addCard: (card: T) => void;
    initialize: () => void;
}

export interface Player<T extends Card> {
    getName: () => string;
    isHuman: () => boolean;
    setGame: (game: Game<T>) => void;
    getGame: () => Game<T> | null;
    getCards: () => T[];
    addCard: (card: T) => void;
    removeCard: (card: T) => T;
    takeRound: (topCard: T | null) => T | null;
    selectCard: (card: T) => void;
    getSelectedCard: () => T | null;
    getPlayableCards: (topCard: T | null) => T[];
    playableCardsCheck: (playableCards: T[]) => void;
}

export interface PlayedCard<T extends Card> {
    player: Player<T>;
    card: T;
}

