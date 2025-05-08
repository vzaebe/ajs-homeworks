import { Team } from './Team';

class Character {
    constructor(name) {
        this.name = name;
    }
}

describe('Team', () => {
    let team;
    let character1;
    let character2;

    beforeEach(() => {
        team = new Team();
        character1 = new Character('Character 1');
        character2 = new Character('Character 2');
    });

    test('should add character to team', () => {
        team.add(character1);
        expect(team.members.has(character1)).toBe(true);
    });

    test('should throw error when adding duplicate character', () => {
        team.add(character1);
        expect(() => team.add(character1)).toThrow('Character already exists in the team');
    });

    test('should add multiple characters without duplicates', () => {
        team.addAll(character1, character2, character1);
        expect(team.members.size).toBe(2);
        expect(team.members.has(character1)).toBe(true);
        expect(team.members.has(character2)).toBe(true);
    });

    test('should convert Set to array', () => {
        team.add(character1);
        team.add(character2);
        const array = team.toArray();
        expect(Array.isArray(array)).toBe(true);
        expect(array.length).toBe(2);
        expect(array).toContain(character1);
        expect(array).toContain(character2);
    });
}); 