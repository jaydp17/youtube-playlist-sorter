'use strict';

const axios = require('axios');

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const { API_KEY } = process.env;

/**
 * Returns a list of Video ids in a playlist
 * @param {string} playlistId The unique id of a playlist
 * @param {string} [pageToken] The next page token as per response can return a max of 50 results
 * @returns {Array<string>}
 */
async function getVideoIdsFromPlayList(playlistId, pageToken) {
  const { data } = await axios.get(`${BASE_URL}/playlistItems`, {
    params: {
      maxResults: '50', // this is the max limit specified in the docs
      part: 'contentDetails',
      playlistId,
      pageToken,
      key: API_KEY,
    },
  });
  const videoIds = data.items.map(item => item.contentDetails.videoId);
  if (data.nextPageToken) {
    const nextPageVideoIds = await getVideoIdsFromPlayList(
      playlistId,
      data.nextPageToken
    );
    return [...videoIds, ...nextPageVideoIds];
  }
  return videoIds;
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
