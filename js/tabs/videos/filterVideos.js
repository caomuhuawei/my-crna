'use strict';

import type {Video} from '../../reducers/videos';

type StringMap = {[key: string]: boolean};

/**
 * ==============================================================================
 * Filter videos by year
 * ------------------------------------------------------------------------------
 * @param {Array.<Video>} videos Collection of videos from Parse class
 * @param {Number} year the year to match against
 * @return {Array}
 * ==============================================================================
 */
export function byYear(videos: Array<Video>, year: number): Array<Video> {
  return videos.filter((video) => video.year === year);
}

/**
 * ==============================================================================
 * Sort flat list of videos into 1-2-2-2... pattern for list view rendering
 * ------------------------------------------------------------------------------
 * @param {Array.<Video>} videos Collection of videos from Parse class
 * @return {Array.Array.<Video>}
 * ==============================================================================
 */
export function asListRows(
  videos: Array<Video> = [],
  splitRowsThreshold: number = 6,
): Array {
  const rows = [];
  // pull out featured videos force single row and place at the start of the list
  rows.push(
    ...videos.filter((v) => v.featured).map((f) => [{type: 'large', ...f}]),
  );
  // filter non-featured videos and do 2-up or full-width depending on length
  const rest = videos.filter((v) => !v.featured);
  if (rest.length >= splitRowsThreshold) {
    rows.push([]); // start rows
    rest.map((v) => {
      // if previous row is already max length, start a new one
      if (rows[rows.length - 1].length === 2) {
        rows.push([v]);
      } else {
        // else add this to an already created row
        rows[rows.length - 1].push(v);
      }
    });
  } else {
    rows.push(...rest.map((r) => [{type: 'large', ...r}])); // 1-up when < minimum split rows length
  }
  // if(rows.length && rows[rows.length - 1].length === 0) rows.pop();
  return rows;
}

/**
 * ==============================================================================
 * Filter videos by selected topics
 * ------------------------------------------------------------------------------
 * @param {Array.<Video>} videos Collection of videos from Parse class
 * @param {Object} topics { <topic string> : boolean } list of enabled topics
 * @return {Array.<Video>}
 * ==============================================================================
 */
export function byTopics(
  videos: Array<Video>,
  topics: StringMap,
): Array<Video> {
  if (Object.keys(topics).length === 0) {
    return videos;
  }
  return videos.filter((video) => {
    let hasMatchingTag = false;
    video.tags.forEach((tag) => {
      hasMatchingTag = hasMatchingTag || topics[tag];
    });
    return hasMatchingTag;
  });
}
