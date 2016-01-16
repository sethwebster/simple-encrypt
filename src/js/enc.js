var encryptor = function(key) {
  this.key = key;
  if (!this.key || this.key.length === 0) {
    throw "A key is required";
  }
  
  this.hashedKey = function() { return md5(this.key); };

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

  this.encrypt = function(stringToEncrypt) {
    return this._calculateResult(stringToEncrypt, function(chr, offset) {
      return (chr.charCodeAt(0)+parseInt(offset));          
    });
  };
  

  this.decrypt = function(stringToDecrypt) {
    return this._calculateResult(stringToDecrypt, function(chr, offset) {
      return (chr.charCodeAt(0)-parseInt(offset));          
    });
  };
};