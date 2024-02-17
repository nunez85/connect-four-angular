export class ConnectGameConfig {
    Tokens: number;
    Players: number;
    Rows: number;
    Cols: number;

    constructor() {
        this.Tokens = 4;
        this.Players = 2;
        this.Rows = 6;
        this.Cols = 7;
    }
}