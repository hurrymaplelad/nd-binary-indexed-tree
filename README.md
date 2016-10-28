N-dimensional Binary Indexed Tree
==============
Provides logarithmic time prefix-sums and updates to numeric data sets in 1, 2, 3, or more dimensions.

Check out [Stack Overflow](http://cs.stackexchange.com/a/10541/60459), [Wikipedia](https://en.wikipedia.org/wiki/Fenwick_tree), and [TopCoder](https://www.topcoder.com/community/data-science/data-science-tutorials/binary-indexed-trees/) for an overview of the data structure in one dimension. [GeeksForGeeks](http://www.geeksforgeeks.org/two-dimensional-binary-indexed-tree-or-fenwick-tree/) has a useful explanation of multi-dimensional generalization, but beware of buggy code.

[![NPM version](http://img.shields.io/npm/v/nd-binary-indexed-tree.svg?style=flat-square)](https://www.npmjs.org/package/nd-binary-indexed-tree)
[![Build Status](http://img.shields.io/travis/hurrymaplelad/nd-binary-indexed-tree/master.svg?style=flat-square)](https://travis-ci.org/hurrymaplelad/nd-binary-indexed-tree)

Getting Started
---------------
Install from NPM
```sh
$ npm install nd-binary-indexed-tree
```
### Examples
```js
const BITree = require('nd-binary-indexed-tree');
let biTree = new BITree({initialValues: [
  [3,  1, 5  ],
  [0, -1, 9.5],
  [4,  4, 90 ]
]});
biTree.sumPrefix([2, 1]); // 11
biTree.adjust([1, 1], +2);
biTree.sumPrefix([2, 1]); // 13
;
```
See [tests](test/) for more examples.
