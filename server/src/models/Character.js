export class Character {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
    this.birthday = data.birthday;
    this.origin = data.origin;
    this.status = data.status;
    this.bounty = data.bounty;
    this.image = data.image;
    this.devil_fruit = data.devil_fruit;
    this.affiliations = data.affiliations;
    this.epiteth = data.epiteth;
    this.resume = data.resume;
  }
}
const character = new Character({
  name: "daniel",
  age: 17,
  birthday: "15 mayo",
  origin: "pene",
  status: "bibo",
  bounty: "10",
});
console.log(character.name);
