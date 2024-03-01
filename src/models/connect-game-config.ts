export class ConnectGameConfig {
    Tokens: number;
    Players: number;
    Rows: number;
    Cols: number;
    GridTemplate: string;

    constructor() {
        this.Tokens = 4;
        this.Players = 2;
        this.Rows = 5;
        this.Cols = 6;
        this.GridTemplate = '1fr 1fr 1fr 1fr 1fr 1fr';
    }
}
