export class Player {
    private name: string;
    private static usedNames: Set<string> = new Set();

    constructor() {
        this.name =  '';
    }

    public setName(name: string): void {
        if (!name) {
            throw new Error('Player name cannot be empty');
        }
        
        if (Player.usedNames.has(name)) {
            throw new Error('Name already taken');
        }

        if (this.name) {
            Player.usedNames.delete(this.name);
        }

        this.name = name;
        Player.usedNames.add(name);
    }

    public getName(): string {
        return this.name;
    }
}
