#! /usr/bin/env node

const pkg = require('../package.json')
require('./upgrade-node-check')(pkg);

import 'babel-polyfill';
import yargs from 'yargs';
import abbreviate from 'number-abbreviate';
import updateNotifier from 'update-notifier';

import playList from './playlist';

const pkg = require('../package.json');

const { YOUTUBE_PLAYLIST_SORTER_API_KEY } = process.env;
if (!YOUTUBE_PLAYLIST_SORTER_API_KEY) {
  console.error('YOUTUBE_PLAYLIST_SORTER_API_KEY not found in env vars');
  process.exit(1);
}

// Check for updates and notify if available
updateNotifier({ pkg }).notify();

const argv = yargs
  .usage('$0 <Playlist URL>')
  .demandCommand(1, 1, 'Youtube Playlist URL not provided!', 'Only 1 Youtube Playlist URL needed!')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .check(_argv => {
    const playListId = playList.getPlaylistId(_argv._[0]);
    if (!playListId) {
      throw new Error('Error: Looks like an invalid Playlist URL 😵');
    }
    return true;
  }).argv;

const main = async () => {
  const playListId = playList.getPlaylistId(argv._[0]);
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
};

function prettyPrintVideo(video, index) {
  let views = abbreviate(video.statistics.viewCount, 1);
  let likes = abbreviate(video.statistics.likeCount, 1);
  if (Number.isNaN(views)) views = 'Disabled';
  if (Number.isNaN(likes)) likes = 'Disabled';
  console.log(`${index + 1}. ${video.snippet.title} [👀  ${views} / 👍  ${likes}]`);
  console.log(`\thttps://www.youtube.com/watch?v=${video.id}`);
  console.log();
}

main();
