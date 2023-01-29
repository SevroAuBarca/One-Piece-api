// Require the framework and instantiate it
import "dotenv/config";
import express from "express";
import { connection } from "./src/db/connection.js";
import { datatemp } from "./src/models/Characters.template.js";
import {
  getCharactersNamesScrapped,
  scrapCharacterData,
} from "./src/services/scrapp.js";
import {
  getCharacters,
  postCharacters,
} from "./src/services/characters.service.js";
import { charactersRoute } from "./src/routes/characters.routes.js";
import cors from "cors";
const app = express();
//app.use(cors());
app.use(cors());
app.use(express.json());
const port = 3000;

connection();
// Declare a route
// app.get("/", async (request, response) => {
//   //const data = await getCharactersNamesScrapped();
//   //const filterData = data.filter((res) => datatempKeys.includes(res) === false);
//   const fullData = await getCharacters();
//   return response.json({ data: fullData });
// });

charactersRoute(app);

// Run the server!
app.listen(port, () => {
  submitData();
  console.log(
    `Example app listening on port http://localhost:${port}/api/v1/characters`
  );
});

const submitData = async () => {
  const datatempKeys = datatemp.map((datakey) => Object.keys(datakey)).flat();
  for (const character of datatempKeys) {
    const characterData = await scrapCharacterData(character);
    await postCharacters(characterData);
  }
};
