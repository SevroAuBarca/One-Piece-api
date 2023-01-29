import {
  getTotalCharacters as getTotalCharactersService,
  getCharacters as getCharactersService,
  getCharacterById as getCharacterByIdService,
  getCharacterByName as getCharacterByNameService,
} from "../services/characters.service.js";

export const getCharacters = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = req.query.limit || 100;

  const totalCharacter = await getTotalCharactersService().catch((err) =>
    res.status(404).json({ messase: "Server Error", Error: err })
  );

  const pages = Math.round(totalCharacter / 100);

  if (page > pages)
    return res
      .status(404)
      .json({ messase: "Server Error", Error: totalCharacter });

  const urlPaginate = getUrlPaginates(page, pages);

  const characters = await getCharactersService(page, limit).catch((err) =>
    res.status(404).json({ message: "ServerError", error: err })
  );

  return res.json({
    description: {
      totalcharacters: totalCharacter,
      pages: pages,
      prevPage: urlPaginate.urlPrev,
      nextPage: urlPaginate.urlNext,
    },
    data: characters,
  });
};

export const getCharactersByName = async (req, res) => {
  console.log("entro");
  const { name } = req.params;
  const characters = await getCharacterByNameService(name);
  return res.json({ data: characters });
};

export const getCharactersById = async (req, res) => {
  const id = req.params.id;
  const character = await getCharacterByIdService(id);

  return res.json({ data: character });
};

export const postCharacter = (req, res) => {};

const getUrlPaginates = (index, pages) => {
  let prev = index;
  let next = index;
  let urlPrev = "";
  let urlNext = "";
  if (index > 1 && index < pages) {
    prev -= 1;
    next += 1;

    urlPrev = `http://localhost:3000/api/v1/characters?page=${prev}`;
    urlNext = `http://localhost:3000/api/v1/characters?page=${next}`;
  }
  if (index === 1) {
    next += 1;
    urlNext = `http://localhost:3000/api/v1/characters?page=${next}`;
  }
  if (index === pages) {
    prev -= 1;
    urlPrev = `http://localhost:3000/api/v1/characters?page=${prev}`;
  }
  return { urlPrev, urlNext };
};
