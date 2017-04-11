const request = require('request');
const GITHUB_USER = "SomeChineseGuy";
const GITHUB_TOKEN = "0b19111919ba897de6aac7f00e9fad8b778a64f4";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };
  let space = "";
  request.get(options)
    .on('error', (err) =>{
      cb;
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
    });
}

getRepoContributors("jquery", "jquery", (results) => {
  for(i in results) {
    console.log(results[i].avatar_url);
  }
});

function downloadImageByURL(url, filepath) {
  
}