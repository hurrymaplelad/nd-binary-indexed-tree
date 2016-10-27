const BITree = require('..');
const assert = require('assert');

describe('nd-binary-indexed-tree', function() {

  it('works', function() {
    let values = [
      [3,  1, 5  ],
      [0, -1, 9.5],
      [4,  4, 90 ],
    ]
    let biTree = new BITree([3,3]);
    for(let row=0; row<3; row++) {
      for(let col=0; col<3; col++) {
        biTree.update([row, col], values[row][col]);
      }
    }

    assert.deepEqual(biTree.get([2, 1]), 11);
    biTree.update([1, 1], 2);
    assert.deepEqual(biTree.get([2, 1]), 14);
  });
});
