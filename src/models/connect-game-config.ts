export class ConnectGameConfig {
    Tokens: number;
    Players: number;
    Rows: number;
    Cols: number;
    GridTemplate: string;

    constructor() {
        this.Tokens = 4;
        this.Players = 2;
        this.Rows = 6;
        this.Cols = 7;
        this.GridTemplate = '1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    }
}
