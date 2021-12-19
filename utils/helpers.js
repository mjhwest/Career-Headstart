module.exports = {
  each_upto: function (ary, max, options) {
    function randomArrayShuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    randomArrayShuffle(ary);

    if (!ary || ary.length == 0) return options.inverse(this);

    var result = [];
    for (var i = 0; i < max && i < ary.length; ++i)
      result.push(options.fn(ary[i]));

    return result.join("");
  },
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};
