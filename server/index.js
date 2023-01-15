// Require the framework and instantiate it
import fastify from "fastify";
import {
  getCharactersNamesScrapped,
  scrapCharacterData,
} from "./src/services/scrapp.js";

const app = fastify({ logger: true });

// Declare a route
app.get("/", async (request, reply) => {
  const data = await getCharactersNamesScrapped();
  scrapCharacterData("Kaidou");
  scrapCharacterData(data[0]);

  return { characters: data };
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
