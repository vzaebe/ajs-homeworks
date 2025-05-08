import Team from "./Team";
import { Character } from "../Character";

test("Добавляем уникального персонажа в команду", () => {
    const team = new Team();
    const character = new Character('Test Character');
    team.add(character);
    expect(team.members.has(character)).toBe(true);
});

test("Нельзя добавить одного и того же персонажа дважды", () => {
    const team = new Team();
    const character = new Character('Test Character');
    team.add(character);
    expect(() => team.add(character)).toThrow('Character already exists in the team');
});

test("Добавляем несколько персонажей", () => {
    const team = new Team();
    const character1 = new Character('Character 1');
    const character2 = new Character('Character 2');
    team.addAll(character1, character2);
    expect(team.members.size).toBe(2);
    expect(team.members.has(character1)).toBe(true);
    expect(team.members.has(character2)).toBe(true);
});

test("Конвертация в массив", () => {
    const team = new Team();
    const character1 = new Character('Character 1');
    const character2 = new Character('Character 2');
    team.addAll(character1, character2);
    const array = team.toArray();
    expect(array).toEqual([character1, character2]);
});
