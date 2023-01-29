import express from "express";
import {
  getCharacters,
  getCharactersById,
  getCharactersByName,
  postCharacter,
} from "../controllers/characters.controller.js";
const router = express.Router();

export const charactersRoute = (app) => {
  router
    .get("/", getCharacters)
    .get("/name/:name", getCharactersByName)
    .get("/:id", getCharactersById)
    .post("/", postCharacter);

  app.use("/api/v1/characters", router);
};
