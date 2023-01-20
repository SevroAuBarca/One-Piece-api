// Require the framework and instantiate it
import "dotenv/config";
import fastify from "fastify";
import { connection } from "./src/db/connection.js";
import { datatemp } from "./src/models/Characters.template.js";
import {
  getCharactersNamesScrapped,
  scrapCharacterData,
} from "./src/services/scrapp.js";

const app = fastify({ logger: true });

connection();
// Declare a route
app.get("/", async (request, reply) => {
  //const data = await getCharactersNamesScrapped();
  //const filterData = data.filter((res) => datatempKeys.includes(res) === false);
  const datatempKeys = datatemp.map((datakey) => Object.keys(datakey)).flat();
  let fullData = [];
  let TempArray = [];
  let count = 0;

  for (let index = 0; index < datatempKeys.length; index++) {
    //const dataTemp = await scrapCharacterData(datatempKeys[index]);
    TempArray.push(datatempKeys[index]);
    if (count === 50) {
      const tempFullData = await Promise.all(
        TempArray.map(async (character) => {
          return await scrapCharacterData(character);
        })
      );

      fullData = [tempFullData, ...fullData];
      TempArray = [];
      count = 0;
    }
    count = count + 1;
  }
  return { data: fullData };
});

// Run the server!
const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
