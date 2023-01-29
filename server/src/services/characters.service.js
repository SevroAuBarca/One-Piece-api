import { Character } from "../models/character.model.js";

const getCharacters = async (page, limit) => {
  const skip = page === 1 ? 0 : page * 100;
  const characters = await Character.find({}).skip(skip).limit(limit);
  return characters;
};

const getTotalCharacters = async () => {
  const totalCharacters = await Character.count();
  return totalCharacters;
};

const getCharacterByName = async (nameChar) => {
  const getAllCharacters = await Character.find({});
  console.log(getAllCharacters[getAllCharacters.length - 1]);
  const findCharacters = getAllCharacters.filter((data, index) => {
    return data.name.includes(nameChar);
  });
  console.log(findCharacters);
  return findCharacters;
};

const getCharacterById = async (id) => {
  const character = await Character.findById(id);
  return character;
};

const postCharacters = async (data) => {
  try {
    await Character.create(data);
    console.log("Añadido correctamente" + data.name);
  } catch (error) {
    console.log(error);
    console.log(data.name);
  }
};

export {
  getCharacters,
  getCharacterByName,
  getTotalCharacters,
  getCharacterById,
  postCharacters,
};
