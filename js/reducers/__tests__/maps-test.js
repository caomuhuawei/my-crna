'use strict';

jest.autoMockOff();

import maps from '../maps';

describe('maps reducer', () => {
  it('is empty by default', () => {
    expect(maps(undefined, {})).toEqual([]);
  });

  it('populates maps from server', () => {
    let list = [];

    expect(maps([], {type: 'LOADED_MAPS', list})).toEqual([
      {
        id: jasmine.any(String),
        name: 'Day 1',
        x1url: 'x1.png',
        x2url: 'x2.png',
        x3url: 'x3.png',
      },
    ]);
  });
});
