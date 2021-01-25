'use strict';

type StringMap = {[key: string]: boolean};

function byDay(sessions: Array<>, day: number): Array<> {
  return sessions.filter((session) => session.day === day);
}

function byTopics(sessions: Array<>, topics: StringMap): Array<> {
  if (Object.keys(topics).length === 0) {
    return sessions;
  }
  return sessions.filter((session) => {
    let hasMatchingTag = false;
    session.tags.forEach((tag) => {
      hasMatchingTag = hasMatchingTag || topics[tag];
    });
    return hasMatchingTag;
  });
}

function bySchedule(sessions = [], schedule: StringMap): Array<> {
  return sessions.filter((session) => schedule[session.id]);
}

function byCompleted(sessions: Array<>, time: number): Array<> {
  return sessions.filter((session) => session.endTime > time);
}

export {byDay, byTopics, bySchedule, byCompleted};
