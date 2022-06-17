import { worldeWords } from "./wordleWords";

export function getWordleWord(): string {
  const index = Math.floor(Math.random() * worldeWords.length);
  return worldeWords[index];
}

export function getWordleId() {
  return `${getWordleWord()}.${getWordleWord()}.${getWordleWord()}`;
}