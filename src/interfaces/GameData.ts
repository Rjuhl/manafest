export interface PlayerData {
    isAdmin: boolean,
    username: string,
    status: number,
    bid: number
    gold: number
};

export interface GameData {
    ledger: string[];
    players: { [key: string]: PlayerData };
    cards_left: number,
    last_cards_drawn: number[]
}