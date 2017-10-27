'use strict';

const url = require('url');
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

function getPlaylistId(playlistUrl) {
  const parsedUrl = url.parse(playlistUrl, true);
  if (!parsedUrl.host || !parsedUrl.host.includes('youtube.com')) return undefined;
  return parsedUrl.query.list;
}

module.exports = { getSortedPlaylist, getPlaylistId };
