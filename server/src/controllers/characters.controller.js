import { getTotalCharacters } from "../services/characters.service";

export const getCharacters = async (req, res) => {
  const total = await getTotalCharacters();

  const pages = Math.round(totalCharacters / 100);

  return res.json();
};

export const getCharactersByName = (req, res) => {};

export const getCharactersById = (req, res) => {};

export const postCharacter = (req, res) => {};
