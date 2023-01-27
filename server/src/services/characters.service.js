import { Character } from "../models/character.model.js";

export const getCharacters = async (skip, limit = 100) => {
  const pages = Math.round(totalCharacters / 100);
  const characters = await Character.find({}).skip(skip).limit(100);
  return characters;
};

export const getTotalCharacters = async () => {
  const totalCharacters = await Character.count();
  return totalCharacters;
};

export const getCharacterByName = async (name) => {
  const getAllCharacters = await Character.find({});
  const findCharacters = getAllCharacters.filter((data) =>
    data.name.includes(name)
  );
  return findCharacters;
};

export const getCharacterById = async (id) => {};

export const postCharacters = async (data) => {
  try {
    await Character.create(data);
    console.log("Añadido correctamente" + data.name);
  } catch (error) {
    console.log(error);
    console.log(data.name);
  }
};

export const promiseHandler = async (promise) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};
export { getCharacters, getCharacterByName, getCharacterById, postCharacters };
