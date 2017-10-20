'use strict';

const { API_KEY } = process.env;
if (!API_KEY) {
  console.error('API_KEY not found in env vars');
  process.exit(1);
}

const abbreviate = require('number-abbreviate');

const playList = require('./playlist');

async function main() {
  const playListId = 'PLOU2XLYxmsILvfJcIASBDbgfxloFz_XsU';
  const videosList = await playList.getSortedPlaylist(playListId);
  videosList.forEach(prettyPrintVideo);
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
