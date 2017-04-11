const request = require('request');
const fs = require('fs');
const GITHUB_USER = "SomeChineseGuy";
const GITHUB_TOKEN = "0b19111919ba897de6aac7f00e9fad8b778a64f4";
const repoOwner = process.argv[2];
const repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(owner, name, cb) {
  let requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };
  let space = "";
  request.get(options)
    .on('error', (err) =>{
      console.log("fucked 2");
    })
    .on('response', (response) =>{
      console.log(`Response code: ${response.statusCode}\n`);
      console.log(`Response message: ${response.statusMessage}\n`);
      console.log(`Content type: ${response.headers['content-type']}\n`);
    })
    .on('data', (data) =>{
      space += data;
    })
    .on('end', (end) => {
      let final = JSON.parse(space);
      cb(final);
      console.log(final);
    });
}

getRepoContributors(repoOwner, repoName, (result) => {
  for(var one of result) {
    console.log(one.login + "   :   " + one.avatar_url);
    const origFileName = one.login;
    const newFileName = `./${origFileName}.jpg`;
    downloadImageByURL(one.avatar_url, newFileName);
    console.log(newFileName);
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
  })
  .on('end', (end) => {
    console.log("You're done!");
  })
  .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL()