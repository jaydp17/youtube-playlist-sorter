'use strict';

const url = require('url');
const api = require('./api');

/**
 * Sorts descending based on a given property
 */
function statisticsComparator(prop, a, b) {
    let aProp = a.statistics[prop];
    let bProp = b.statistics[prop];

    if (isNaN(aProp)) {
      aProp = 0;
    }

    if (isNaN(bProp)) {
      bProp = 0;
    }

    return bProp - aProp;
}

/**
 * Sorts descending based on viewCount / popularity
 */
function viewComparator(a, b) {
  return statisticsComparator('viewCount', a, b);
}

function likeComparator(a, b) {
  return statisticsComparator('likeCount', a, b);
}

/**
 * Returns a sorted playlist based on a given comparator.
 * @param playListId
 * @param {function} comparator - the comparator to sort by.
 * @returns {Promise.<Array.<T>|*>}
 */
async function getSortedPlaylist(playListId, comparator = viewComparator) {
  try {
    const videoIds = await api.getVideoIdsFromPlayList(playListId);
    const videos = await Promise.all(videoIds.map(api.getVideoDetails));
    return videos.sort(comparator);
  } catch (e) {
    throw e;
  }
}

function getPlaylistId(playlistUrl) {
  const parsedUrl = url.parse(playlistUrl, true);
  if (!parsedUrl.host || !parsedUrl.host.includes('youtube.com')) return undefined;
  return parsedUrl.query.list;
}

module.exports = { getSortedPlaylist, getPlaylistId, viewComparator, likeComparator };
