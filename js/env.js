'use strict';

module.exports = {
  version: 410,
  testMenuEnabled: false,
  parseAppID: 'oss-f8-app-2017',
  serverURL: 'http://localhost:1337',
  graphqlURL: 'http://localhost:4000/graphql',
  compatibleStoreVersion: '0.10',
  gcmSenderId: '336769939688',
  timezone: 'America/Los_Angeles',
  dayLabel(num) {
    const days = {1: 'Tue 4/18', 2: 'Wed 4/19'};
    return days[num] || `Day ${num}`;
  },
};
