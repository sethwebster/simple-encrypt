console.info("Simple-Encrypt by Seth Webster");
console.info("+-------------------------------------------+");
console.info("| Fork me on GitHub:                        |");
console.info("| http://tinyurl.com/simple-encrypt         |");
console.info("+-------------------------------------------+");

function perform(action) {
  var cypher  = $("#cypher-string-input").val(),
      wrapper = $("#cypher-string-wrapper"),
      text    = $("#text").val();

  if (cypher.length > 0) {
    var e = new SimpleEncrypt(cypher);
    act(action, text, e);
  } else {
    wrapper.addClass("has-error");
  }
}

function setText(text) {
  $("#text").val(text);
}

function act(action, text, simpleEncrypt) {
  if (action == "encrypt") {
    setText(simpleEncrypt.encrypt(text))
  }
  if (action == "decrypt") {
    setText(simpleEncrypt.decrypt(text))
  }
}

$(document).ready(function() {
  $("#btn-encrypt").click(function(){
    perform("encrypt");
  });
  $("#btn-decrypt").click(function(){
    perform("decrypt");
  });
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYXNzZXJ0LmpzIiwiZW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5pbmZvKFwiU2ltcGxlLUVuY3J5cHQgYnkgU2V0aCBXZWJzdGVyXCIpO1xuY29uc29sZS5pbmZvKFwiKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXCIpO1xuY29uc29sZS5pbmZvKFwifCBGb3JrIG1lIG9uIEdpdEh1YjogICAgICAgICAgICAgICAgICAgICAgICB8XCIpO1xuY29uc29sZS5pbmZvKFwifCBodHRwOi8vdGlueXVybC5jb20vc2ltcGxlLWVuY3J5cHQgICAgICAgICB8XCIpO1xuY29uc29sZS5pbmZvKFwiKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXCIpO1xuXG5mdW5jdGlvbiBwZXJmb3JtKGFjdGlvbikge1xuICB2YXIgY3lwaGVyICA9ICQoXCIjY3lwaGVyLXN0cmluZy1pbnB1dFwiKS52YWwoKSxcbiAgICAgIHdyYXBwZXIgPSAkKFwiI2N5cGhlci1zdHJpbmctd3JhcHBlclwiKSxcbiAgICAgIHRleHQgICAgPSAkKFwiI3RleHRcIikudmFsKCk7XG5cbiAgaWYgKGN5cGhlci5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGUgPSBuZXcgU2ltcGxlRW5jcnlwdChjeXBoZXIpO1xuICAgIGFjdChhY3Rpb24sIHRleHQsIGUpO1xuICB9IGVsc2Uge1xuICAgIHdyYXBwZXIuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0VGV4dCh0ZXh0KSB7XG4gICQoXCIjdGV4dFwiKS52YWwodGV4dCk7XG59XG5cbmZ1bmN0aW9uIGFjdChhY3Rpb24sIHRleHQsIHNpbXBsZUVuY3J5cHQpIHtcbiAgaWYgKGFjdGlvbiA9PSBcImVuY3J5cHRcIikge1xuICAgIHNldFRleHQoc2ltcGxlRW5jcnlwdC5lbmNyeXB0KHRleHQpKVxuICB9XG4gIGlmIChhY3Rpb24gPT0gXCJkZWNyeXB0XCIpIHtcbiAgICBzZXRUZXh0KHNpbXBsZUVuY3J5cHQuZGVjcnlwdCh0ZXh0KSlcbiAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgJChcIiNidG4tZW5jcnlwdFwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHBlcmZvcm0oXCJlbmNyeXB0XCIpO1xuICB9KTtcbiAgJChcIiNidG4tZGVjcnlwdFwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHBlcmZvcm0oXCJkZWNyeXB0XCIpO1xuICB9KTtcbn0pOyIsInZhciBhc3NlcnQgPSB7XG4gIHRlc3RlcnM6IHtcbiAgICBpc1RydWU6IGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiBhID09PSB0cnVlO1xuICAgIH0sXG4gICAgYXJlRXF1YWw6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBhID09PSBiO1xuICAgIH1cbiAgfSxcbiAgaXNUcnVlOiBmdW5jdGlvbihhLCBtZXNzYWdlKSB7XG4gICAgaWYoIXRoaXMudGVzdGVycy5pc1RydWUoYSkpIHtcbiAgICAgIHRocm93IG1lc3NhZ2UgPyBtZXNzYWdlIDogYSArIFwiIGlzIG5vdCB0cnVlXCI7XG4gICAgfVxuICB9LFxuICBhcmVFcXVhbDogZnVuY3Rpb24oYSwgYiwgbWVzc2FnZSkge1xuICAgIGlmICghdGhpcy50ZXN0ZXJzLmFyZUVxdWFsKGEsYikpIHtcbiAgICAgIHRocm93IG1lc3NhZ2UgPyBtZXNzYWdlIDogYSArIFwiIGlzIG5vdCBlcXVhbCB0byBcIiArIGI7XG4gICAgfVxuICB9XG59OyIsInZhciBTaW1wbGVFbmNyeXB0ID0gZnVuY3Rpb24oa2V5KSB7XG4gIHRoaXMua2V5ID0ga2V5O1xuICBpZiAoIXRoaXMua2V5IHx8IHRoaXMua2V5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IFwiQSBrZXkgaXMgcmVxdWlyZWRcIjtcbiAgfVxuICBcbiAgdGhpcy5oYXNoZWRLZXkgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG1kNSh0aGlzLmtleSk7IH07XG5cbiAgdGhpcy5lbmNyeXB0ID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RvQ3J5cHRvKHN0cmluZywgdGhpcy5fZm9yd2FyZCk7XG4gIH07XG5cbiAgdGhpcy5kZWNyeXB0ID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RvQ3J5cHRvKHN0cmluZywgdGhpcy5fcmV2ZXJzZSk7XG4gIH07XG5cbiAgdGhpcy5fY2FsY3VsYXRlUmVzdWx0ID0gZnVuY3Rpb24oc3RyaW5nLCBtb2RpZmllcikge1xuICAgIHZhciBjaGFycyA9IHN0cmluZy5zcGxpdChcIlwiKSxcbiAgICAgICAgcmVzdWx0ID0gXCJcIixcbiAgICAgICAga2V5U3RyaW5nSW5kZXggPSAwLFxuICAgICAgICBrZXkgPSB0aGlzLmhhc2hlZEtleSgpO1xuICAgIFxuICAgIGNoYXJzLmZvckVhY2goZnVuY3Rpb24oY2hyLCBpbmRleCwgYXJyKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0ga2V5LmNoYXJDb2RlQXQoa2V5U3RyaW5nSW5kZXgpLFxuICAgICAgICAgIG5ld1ZhbHVlID0gbW9kaWZpZXIoY2hyLCBvZmZzZXQpO1xuICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUobmV3VmFsdWUpO1xuICAgICAga2V5U3RyaW5nSW5kZXggPSBrZXlTdHJpbmdJbmRleCArIDEgPj0ga2V5Lmxlbmd0aCA/IDAgOiBrZXlTdHJpbmdJbmRleCArIDE7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB0aGlzLl9mb3J3YXJkID0gZnVuY3Rpb24oY2hyLCBvZmZzZXQpIHsgcmV0dXJuIGNoci5jaGFyQ29kZUF0KDApK3BhcnNlSW50KG9mZnNldCk7IH1cbiAgdGhpcy5fcmV2ZXJzZSA9IGZ1bmN0aW9uKGNociwgb2Zmc2V0KSB7IHJldHVybiBjaHIuY2hhckNvZGVBdCgwKS1wYXJzZUludChvZmZzZXQpOyB9XG5cbiAgdGhpcy5fZG9DcnlwdG8gPSBmdW5jdGlvbihzdHJpbmcsIGRpcmVjdGlvbikge1xuICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdGVSZXN1bHQoc3RyaW5nLCBmdW5jdGlvbihjaHIsIG9mZnNldCkge1xuICAgICAgcmV0dXJuIChkaXJlY3Rpb24oY2hyLCBvZmZzZXQpKTsgICAgICAgICAgXG4gICAgfSk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
