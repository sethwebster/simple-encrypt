var SimpleEncrypt = function(key) {
  this.key = key;
  if (!this.key || this.key.length === 0) {
    throw "A key is required";
  }
  
  this.hashedKey = function() { return md5(this.key); };

  this.encrypt = function(string) {
    return this._doCrypto(string, this._forward);
  };

  this.decrypt = function(string) {
    return this._doCrypto(string, this._reverse);
  };

  this._calculateResult = function(string, modifier) {
    var chars = string.split(""),
        result = "",
        keyStringIndex = 0,
        key = this.hashedKey();
    
    chars.forEach(function(chr, index, arr) {
      var offset = key.charCodeAt(keyStringIndex),
          newValue = modifier(chr, offset);
      result += String.fromCharCode(newValue);
      keyStringIndex = keyStringIndex + 1 >= key.length ? 0 : keyStringIndex + 1;
    });
    return result;
  };

  this._forward = function(chr, offset) { return chr.charCodeAt(0)+parseInt(offset); }
  this._reverse = function(chr, offset) { return chr.charCodeAt(0)-parseInt(offset); }

  this._doCrypto = function(string, direction) {
    return this._calculateResult(string, function(chr, offset) {
      return (direction(chr, offset));          
    });
  }
}

var RSAEncrypt = function() {
  this.values = {
    p: 0,
    q: 0,
    e: 0,
    n: 0, //phi
    primes: []
  }

  this.generateValues = function() {
    if (this.primes.length == 0) {
      this.primes = this.generatePrimes(100000, 2048);
    }
  }

  this.isPrime = function(n) {
    if (n === 1 || n === 0) {
      return false;
    }
    for(var i = 2;i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  this.generatePrimes = function(howMany,startAt) {
    while (!this.isPrime(startAt)) {
      startAt += 1;
    }
    var ret = [startAt];
    var curr = startAt;
    for(var i = 0;i < howMany - 1; i++) {
      do {
        curr += 1;
      }
      while (!this.isPrime(curr));
      ret.push(curr);
    }
    return ret;
  }  
}