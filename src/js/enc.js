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
    e: 3,
    n: 0, 
    d: 0,
    phi: 0,
    primes: []
  };

  this.initialized = false;

  this.init = function () {
    if (this.initalized) {
      return;
    }
    this._generateValues();
    console.log(this.values);
  }



  this._generateValues = function() {
    if (this.values.primes.length == 0) {
      this.values.primes = this._generatePrimes(1000, 1000000);
    }
    this.values.p = this.values.primes[Math.floor(Math.random() * this.values.primes.length) + 0]
    this.values.q = this.values.p;
    while (this.values.p == this.values.q) {
      this.values.q = this.values.primes[Math.floor(Math.random() * this.values.primes.length) + 0];
    }
    this.values.n = this.values.p * this.values.q;
    this.values.phi = (this.values.p-1)*(this.values.q-1);
    this.values.d = this._extendedEuclidian(this.values.phi, this.values.e);
  }

  this._isPrime = function(n) {
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

  this._generatePrimes = function(howMany,startAt) {
    console.info("Generating "+howMany+" Primes...");
    while (!this._isPrime(startAt)) {
      startAt += 1;
    }
    var ret = [startAt];
    var curr = startAt;
    for(var i = 0;i < howMany - 1; i++) {
      do {
        curr += 1;
      }
      while (!this._isPrime(curr));
      ret.push(curr);
    }
    console.info("Generated "+howMany+" Primes...");
    return ret;
  }  

  this._extendedEuclidian = function (phi, e) {
    var lv = phi, rv = phi, lsv = e, rsv = 1;
    var le = 0;
    var lt, rt = 0;
    do {
      var ldiv = Math.floor(lv/lsv);
      var ldiff = lv - (ldiv * lsv);
      var rdiff = rv - (ldiv * rsv);
      var swpLsv = lsv,
          swpRsv = rsv;
      lsv = ldiff;
      rsv = rdiff;
      lv = swpLsv;
      rv = swpRsv;  
      
      if (rsv < 0) {
        rsv = rsv + phi;
      }
    }
    while(lsv > 1);
    return rsv;
  }

  this.gcd = function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }


}