'use strict';

const api = require('./api');

/**
 * Sorts descending based on viewCount / popularity
 */
function comparator(a, b) {
  return b.statistics.viewCount - a.statistics.viewCount;
}

async function getSortedPlaylist(playListId) {
  const videoIds = await api.getVideoIdsFromPlayList(playListId);
  const videos = await Promise.all(videoIds.map(api.getVideoDetails));
  return videos.sort(comparator);
}

module.exports = { getSortedPlaylist };
