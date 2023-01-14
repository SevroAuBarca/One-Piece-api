import axios from "axios"; // or const axios = require('axios');
import { load } from "cheerio"; // const { load } = require('cheerio')
export const getCharactersNamesScrapped = async () => {
  try {
    const { data: html } = await axios.get(
      "https://listfist.com/list-of-one-piece-characters"
    );
    //

    const $ = load(html);

    const contents = $("[class='col-3 odd']")
      .map((_, elem) => $(elem).text())
      .get();
    return contents;
    console.log(contents);
  } catch (e) {
    console.error(e);
  }
};
