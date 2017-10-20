'use strict';

const axios = require('axios');
const util = require('util');

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const { API_KEY } = process.env;
if (!API_KEY) {
  console.error('API_KEY not found in env vars');
  process.exit(1);
}

async function main() {
  const { data } = await makeRequest();
  const videoIds = data.items.map(processItem);
  console.log(videoIds);
}

function processItem(item) {
  return item.contentDetails.videoId;
}

async function makeRequest() {
  return axios.get(`${BASE_URL}/playlistItems`, {
    params: {
      maxResults: '25',
      part: 'snippet,contentDetails',
      playlistId: 'PLOU2XLYxmsILvfJcIASBDbgfxloFz_XsU',
      key: process.env.API_KEY,
    },
  });
}

main();

// .then(res => console.log(util.inspect(res.data, false, 20, true)))
// .catch(console.error);
