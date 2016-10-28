const BITree = require('..');
const assert = require('assert');

describe('nd-binary-indexed-tree', function() {

  it('works with 1d data', function() {
    let biTree = new BITree({initialValues: [3,  1, 5]});
    assert.equal(biTree.sumPrefix([1]), 4);
    biTree.adjust([1], +2);
    assert.equal(biTree.sumPrefix([1]), 6);
  });

  it('works with 2d data', function() {
    let biTree = new BITree({initialValues: [
      [3,  1, 5  ],
      [0, -1, 9.5],
      [4,  4, 90 ]
    ]});
    assert.equal(biTree.sumPrefix([2, 1]), 11);
    biTree.adjust([1, 1], 2);
    assert.equal(biTree.sumPrefix([2, 1]), 13);
  });

  it('works with 3d data', function() {
    let biTree = new BITree({initialValues: [
      [
        [2, 1],
        [3, 4]
      ], [
        [5, 2],
        [1, 9]
      ]
    ]});
    assert.equal(biTree.sumPrefix([1, 0, 0]), 7);
    biTree.adjust([1, 0, 0], +2);
    assert.equal(biTree.sumPrefix([1, 0, 0]), 9);
  });

  describe('constructor', function() {
    it('initializes zeroed tree if only passed dimensions', function() {
      biTree = new BITree({dimensions: [2, 2, 2]});
      assert.equal(biTree.sumPrefix([1, 1, 1]), 0);
    });

    it('infers dimensions from initial values', function() {
      biTree = new BITree({initialValues: [
        [2,5,1],
        [1,7,4]
      ]});
      assert.equal(biTree.sumPrefix([1,1]), 15);
    });
  });
});
