import { worldeWords } from "./wordleWords";

export function getWordleWord(): string {
  const index = Math.floor(Math.random() * worldeWords.length);
  return worldeWords[index];
}

// TODO: Use a map
export function isWordleWord(word: string): boolean {
  return worldeWords.includes(word.toLowerCase());
}