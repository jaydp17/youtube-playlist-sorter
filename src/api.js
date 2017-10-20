'use strict';

const axios = require('axios');

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const { API_KEY } = process.env;

async function getVideoIdsFromPlayList(playlistId) {
  const { data } = await axios.get(`${BASE_URL}/playlistItems`, {
    params: {
      maxResults: '50',
      part: 'contentDetails',
      playlistId,
      key: API_KEY,
    },
  });
  return data.items.map(item => item.contentDetails.videoId);
}

async function getVideoDetails(videoId) {
  const { data } = await axios.get(`${BASE_URL}/videos`, {
    params: {
      id: videoId,
      part: 'snippet,statistics',
      key: API_KEY,
    },
  });
  return data.items[0];
}

module.exports = {
  getVideoIdsFromPlayList,
  getVideoDetails,
};

// getVideoDetails('3NIopUsI4ik').then(console.log);
