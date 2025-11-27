const cheerio = require('cheerio');
const fs = require('fs');
// should be scraped from the script tag
// example 

class Scraper {
  constructor(fileName) {
    this.fileName = fileName;
    this.items = [];
  }
  static async start() {
    fs.writeFile('./data.json', "", err => console.log(err));
    await new Scraper("words1HTML.html").scan();
    await new Scraper("words2HTML.html").scan();
    await new Scraper("words3HTML.html").scan();
  }

  async scan() {
    const fileBuffer = await fs.readFileSync(this.fileName, 'utf8');
    const $ = cheerio.load(fileBuffer);

    await this.goOverFile(fileBuffer);
    await this.pushData();
  }

  goOverFile(buffer, index = 1) {
    return new Promise(async (resolve, reject) => {
      console.log('Scanning card ' + index);
      let arr = buffer.split('"cardSides\\":');
      let card = arr[index];
      if (index >= arr.length) {
        return resolve()
      }

      let words = card.split('"plainText\\":\\"');
      let output = [];
      for (let side = 1; side <= 2; side++) {
        output.push(words[side].split('\\",')[0]);
      }
      this.items.push(output);

      return resolve(this.goOverFile(buffer, index + 1));
    })
  }
  async pushData() {
    fs.appendFileSync('./data.json', JSON.stringify(this.items, null, 2), err => {
      if (err) {
        console.log("An error has accured " + err);
        return;
      }
      console.log("Data written successfully!");
    });
  }
}
module.exports = Scraper;
