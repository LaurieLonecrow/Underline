/* eslint-disable no-prototype-builtins */

var _ = {};

// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.
_.first = function (array, n) {
  let arr = [];
  if (array == undefined || array == null) return [];
  let args = Array.prototype.slice.call(arguments[0]);
  if (n == undefined || n == null || n <= 0) {
    arr = args.slice(0,1);
  } else if (n <= args.length) {
    arr = args.slice(0,n);
  } else if (n > args.length) {
    arr = args.slice(0);
  } 
  return arr;
};

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
  let arr = [];
  if (array == undefined || array == null) return [];
  let args = Array.prototype.slice.call(arguments[0]);
  let last = args.length - n;
  if ( last < 0) {
    last = 0;
  }
  if (n == undefined || n == null || n <= 0) {
    arr = args.slice(args.length - 1);
  } else if (n == n) {
    arr = args.slice(last);
  }
  return arr;
};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let index = array[i];
    if (arr.indexOf(index) === -1) {
      arr.push(index);
    }
  }
  return arr;
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  return destination;
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (destination[prop] === undefined) {
        destination[prop] = source[prop];}
    }}
  return destination;
};

// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iteratee.call(context, collection[i], i, collection);
    }
  } else {
    for (let key in collection) { 
      if (collection.hasOwnProperty(key)) {
        iteratee.call(context, collection[key], key, collection); 
      }
    }
  } 
  return collection;
};

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {
  let newArray = [];
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iteratee.call(context, collection[i], i, collection); {
        newArray.push(collection[i]);
      }
    } 
  } else { 
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) { 
        iteratee.call(context, collection[key], key, collection); {
          newArray.push(collection[key]);   
        } 
      } 
    }
  }
  return newArray;
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.


// _.reduce = function (collection, iteratee, accumulator, context) {
//   let initial = 0;
//   let values = Object.values(collection);
//   console.log(collection, values);
//   if (accumulator == undefined || accumulator == null) {
//     accumulator = values[0];
//     initial = 1;
//   }
//   for (let i = initial; i < values.length; i++) {
//     accumulator = iteratee.call(context, accumulator, values[i], i, values); 
//   }
//   return accumulator;
// };

_.reduce = function (collection, iteratee, accumulator, context) {
  _.each(collection, function (value, key) {
    if (accumulator == undefined) {
      accumulator = value;
    } else {
      accumulator = iteratee.call(context, accumulator, value, key, collection);
    }
  });

  return accumulator;
};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
  let truth = [];
  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) { 
        if (predicate.call(context, collection[key], key, collection)) {
          truth.push(collection[key]);
        }
      }
    }     
  } else {
    for ( var i = 0; i < collection.length; i++) {
      if (predicate.call(context, collection[i], i, collection)) {
        truth.push(collection[i]);
      }
    }
  }
  return truth;
};



// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
  let notTruth = [];
  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) { 
        if (!predicate.call(context, collection[key], key, collection)) {
          notTruth.push(collection[key]);
        }
      }
    }     
  } else {
    for ( var i = 0; i < collection.length; i++) {
      if (!predicate.call(context, collection[i], i, collection)) {
        notTruth.push(collection[i]);
      }
    }
  }
  return notTruth;

};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (!predicate.call(context, collection[i], i, collection)) {
        return false;}
    }
  } else {
    for (let key in collection) { 
      if (collection.hasOwnProperty(key)) {
        if (!predicate.call(context, collection[key], key, collection)) {
          return false;} 
      }
    }
  } 
  return true;
};
// _.every = function (collection, predicate) {
//   _.reduce((collection, newArray, element) => {
//     if (predicate(element) === true) {
//       newArray.push(element);
//     }
//   });
// }; 

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate.call(context, collection[i], i, collection)) {
        return true;
      }
    }
  } else {
    for (let key in collection) { 
      if (collection.hasOwnProperty(key)) {
        if (predicate.call(context, collection[key], key, collection)) {
          return true;
        } 
      }
    }
  } 
  return false;
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName) {
  let array = [];  
  let args = Array.prototype.slice.call(arguments, 2);
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      collection[methodName].call(collection[i], ...args);
      array.push(collection[i]);
    }
  } else {
    for (let key in collection) { 
      if (collection.hasOwnProperty(key)) {
        collection[methodName].call(collection[key], ...args);
        array.push(collection[key]);
      }
    }
  }
  return array;
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
  let newArray = [];
  _.map(collection, function (element) {
    newArray.push(element[propertyName]);
  }); 
  return newArray;
};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.
_.once = function (func) {
  let answer;
  let value = false;
  return function () {
    if (value == false)  {
      value = true;
      answer = func.apply(this, arguments);
    }
    return answer;
  };
};


// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
  let cache = [];
  return function (arg) {
    if (arg in cache) {
      return cache[arg];
    } else {
      let result = func.apply(this, arguments);
      cache[arg] = result;
      return result;
    }
    
  };
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
// _.delay = function (func, wait) {
//   let args = Array.prototype.slice.call(arguments,2);
//   return setTimeout(function () {
//     return func.apply(this, args);
//   }, wait);
// };

_.delay = function (func, wait) {
  let args = Array.prototype.slice.call(arguments,2);
  let date = 0;
  const now = setTimeout(() => {
    date += wait;
    if (date === wait) {
      return func.apply(this, args);
    }
  }, wait);
};
    

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {
  let throttled = false;
  let result; 
  return function () {
    if (throttled == false) { 
      result = func.apply(this, arguments); 
      throttled = true;
      setTimeout(function () {
        throttled = false;
      }, wait);
    }
    return result;
  };
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}
