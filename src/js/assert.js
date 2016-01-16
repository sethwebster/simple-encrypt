var assert = {
  testers: {
    isTrue: function(a) {
      return a === true;
    },
    areEqual: function(a, b) {
      return a === b;
    }
  },
  isTrue: function(a, message) {
    if(!this.testers.isTrue(a)) {
      throw message ? message : a + " is not true";
    }
  },
  areEqual: function(a, b, message) {
    if (!this.testers.areEqual(a,b)) {
      throw message ? message : a + " is not equal to " + b;
    }
  }
};