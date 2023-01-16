// Require the framework and instantiate it
import fastify from "fastify";
import { datatemp } from "./src/models/Characters.template.js";
import {
  getCharactersNamesScrapped,
  scrapCharacterData,
} from "./src/services/scrapp.js";

const app = fastify({ logger: true });

// Declare a route
app.get("/", async (request, reply) => {
  const data = await getCharactersNamesScrapped();
  const datatempKeys = datatemp.map((datakey) => Object.keys(datakey)).flat();
  console.log(datatempKeys);
  const filterData = data.filter((res) => datatempKeys.includes(res) === false);
  const fullData = await Promise.all(
    datatempKeys.map(async (character) => {
      return await scrapCharacterData(character);
    })
  );

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
