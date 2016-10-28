/*
 * Ex: 0110 -> 0010
 */
function lsbMask(x) {
  return x & -x;
}

function tailMask(x) {
  return lsbMask(x) << 1;
}

function isRightChild(x) {
  return (x & tailMask(x)) > 0;
}

/*
 * Returns the integer encoding the input bit path
 * without the last bit.
 * Ex: path 0101 (lrlr) encodes as 010110
 *     one step back is encoded as 010100
 *     another step back is        011000
 */
function shortenBitPath(x) {
  return (
    x - lsbMask(x) // clear lsb
    | tailMask(x)  // move lsb up one
  );
}

/**
 * Encoding a binary tree in an array using bit paths
 * is simplest with indicies starting at 1. We offset
 * all path operations by -1 to save space and provide a
 * familiar 0-indexed API.
 */
class BITree {
  constructor (options, dimension=0) {
    let {dimensions, initialValues} = options;

    if(initialValues) {
      dimensions = [];
      for(let dim = initialValues; dim && dim.length; dim = dim[0]) {
        dimensions.push(dim.length);
      }
    }

    if(!dimensions || !dimensions.length) {
      throw new Error('provide either dimensions or initial values');
    }

    // expected number of entries at this dimension
    let size = dimensions[dimension];
    // next larger power of 2 (we need a complete binary tree)
    let k = Math.ceil(Math.log(size + 1) / Math.log(2));
    // index into vectors
    this.dimension = dimension;
    this.isLastDimension = (dimension === dimensions.length - 1);
    // exclusive
    this.indexCap = (1 << k) - 1;
    // index of the root of the tree
    this.rootIndex = (1 << (k-1)) - 1;
    // holds the next dimesion of sums, or
    // the cumulative values for the last dimension.
    this.cumulative = new Array(this.indexCap);

    for(let i=0; i<this.indexCap; i++) {
      this.cumulative[i] = (this.isLastDimension ? 0 :
        new BITree({dimensions}, dimension+1)
     );
    }

    if(initialValues) {
      this._initialize(initialValues);
    }
  }

  _initialize(values) {
    let path = [];
    for(let v of this._walk(values, path)) {
      this.adjust(path, v);
    }
  }

  /*
   * Returns a generator that iterates the values of
   * an N-dimensional nested array strucuture.
   * If the provided, the argument path array will contain the
   * path the to the current value after each iteration.
   */
  *_walk(values, path=[]) {
    for(let i=0; i<values.length; i++) {
      path.push(i);
      let v = values[i];
      if(v.length) {
        yield * this._walk(v, path);
      } else {
        yield v;
      }
      path.pop();
    }
  }

  /**
   * Returns the cumulative total of values through index i.
   */
  sumPrefix(vector) {
    let i = vector[this.dimension];
    let total = 0;
    while(i+1) {
      let partial = (this.isLastDimension ?
        this.cumulative[i] :
        // recurse into the next dimension
        this.cumulative[i].sumPrefix(vector)
      );
      total += partial;
      // Simplified from: (i + 1) - lsbMask(i + 1) - 1
      i -= lsbMask(i+1);
    }
    return total;
  }

  adjust(vector, diff) {
    let i = vector[this.dimension];
    let shouldAccumulate = true;
    // Propagate up the tree, applying the diff
    // whenever we came from a left child
    while(i < this.indexCap) {
      if(!shouldAccumulate){
        // no op
      } else if(this.isLastDimension) {
          this.cumulative[i] += diff;
      } else {
          this.cumulative[i].adjust(vector, diff);
      }
      shouldAccumulate = !isRightChild(i+1);
      i = shortenBitPath(i+1) - 1;
    }
  }
}

module.exports = BITree;
