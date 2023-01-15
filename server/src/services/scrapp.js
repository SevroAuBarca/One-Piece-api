import axios from "axios"; // or const axios = require('axios');
import { load } from "cheerio"; // const { load } = require('cheerio')
import { Character } from "../models/Character.js";
import download from "image-downloader";

import appRoot from "app-root-path";
import { uploadImage } from "./clodinary.js";
let $;

export const getCharactersNamesScrapped = async () => {
  try {
    const { data: html } = await axios.get(
      "https://listfist.com/list-of-one-piece-characters"
    );
    //

    $ = load(html);

    const contents = getDataFromPage("[class='col-3 odd']");
    return contents.filter((_, index) => index !== 0);
  } catch (e) {
    console.error(e);
  }
};

export const scrapCharacterData = async (name) => {
  const newName = name.includes(" ") ? name.replaceAll(" ", "_") : name;
  try {
    const { data: html } = await axios.get(
      `https://onepiece.fandom.com/wiki/${newName}`
    );
    $ = load(html);
    const dataStadisticsTitles = getDataFromPage(
      ".pi-item.pi-data.pi-item-spacing.pi-border-color > h3"
    );
    const dataStadistics = getDataFromPage(
      ".pi-item.pi-data.pi-item-spacing.pi-border-color > .pi-data-value.pi-font"
    );
    const image = $(".image.image-thumbnail > .pi-image-thumbnail").attr("src");

    const imageFilePath = await downloadImage(image, name);
    uploadImage(imageFilePath);
    const keyValueData = {};
    dataStadisticsTitles.forEach((data, index) => {
      data = data.replaceAll(":", "");
      keyValueData[data] = dataStadistics[index];
    });
    return new Character({ name: name });
  } catch (error) {
    console.log(error);
  }
  //
};

const getDataFromPage = (selector) => {
  return $(selector)
    .map((_, elem) => $(elem).text())
    .get();
};

const downloadImage = async (url, name) => {
  const options = {
    url: url,
    dest: `${appRoot}/src/temp-assets/${name}.png`, // will be saved to /path/to/dest/image.jpg
  };

  try {
    const { filename } = await download.image(options);
    return filename;
  } catch (error) {
    console.error(error.message);
  }
};
