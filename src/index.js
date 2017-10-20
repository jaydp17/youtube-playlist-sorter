'use strict';

const { API_KEY } = process.env;
if (!API_KEY) {
  console.error('API_KEY not found in env vars');
  process.exit(1);
}

const rawPlaylistUrl = process.argv[2];
const playlistUrl = rawPlaylistUrl && rawPlaylistUrl.trim();
if (!playlistUrl) {
  console.log('Usage: index.js [playlistUrl]\n');
  console.log('Missing argument: playlistUrl');
  process.exit(1);
}

const abbreviate = require('number-abbreviate');
const playList = require('./playlist');

async function main() {
  const playListId = playList.getPlaylistId(playlistUrl);
  if (!playListId) {
    console.error('Looks like an invalid playlist url 😵');
    process.exit(1);
  }
  try {
    const videosList = await playList.getSortedPlaylist(playListId);
    videosList.forEach(prettyPrintVideo);
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

function prettyPrintVideo(video, index) {
  const views = abbreviate(video.statistics.viewCount, 1);
  const likes = abbreviate(video.statistics.likeCount, 1);
  console.log(
    `${index + 1}. ${video.snippet.title} [👀  ${views} / 👍  ${likes}]`
  );
  console.log(`\thttps://www.youtube.com/watch?v=${video.id}`);
  console.log();
}

main();
