console.info("Simple-Encrypt by Seth Webster");
console.info("+-------------------------------------------+");
console.info("| Fork me on GitHub:                        |");
console.info("| http://tinyurl.com/simple-encrypt         |");
console.info("+-------------------------------------------+");

var encoding = {
  none: {
    to: function(string) {
      return string;
    },
    from: function(string) {
      return string;
    }
  },
  base64: {
    to: function(string) {
      return window.btoa(escape(encodeURIComponent(string)));
    },
    from: function(string) {
      return decodeURIComponent(unescape(window.atob(string)));
    }
  }
};

function updateStats() {
  $("#stats").html($("#text").val().length);
}

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
  var outputEncoder = encoding["none"];
  if ($("#encoding-base64").is(":checked")) {
    outputEncoder = encoding["base64"];
  }
  if (action == "encrypt") {
    setText(outputEncoder.to(simpleEncrypt.encrypt(text)));
  }
  if (action == "decrypt") {
    setText(simpleEncrypt.decrypt(outputEncoder.from(text)));
  }
  updateStats();
}

$(document).ready(function() {
  $("#btn-encrypt").click(function(){
    perform("encrypt");
  });
  $("#btn-decrypt").click(function(){
    perform("decrypt");
  });
  $('#text').bind('input propertychange', function() {
    updateStats();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYXNzZXJ0LmpzIiwiZW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmluZm8oXCJTaW1wbGUtRW5jcnlwdCBieSBTZXRoIFdlYnN0ZXJcIik7XG5jb25zb2xlLmluZm8oXCIrLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcIik7XG5jb25zb2xlLmluZm8oXCJ8IEZvcmsgbWUgb24gR2l0SHViOiAgICAgICAgICAgICAgICAgICAgICAgIHxcIik7XG5jb25zb2xlLmluZm8oXCJ8IGh0dHA6Ly90aW55dXJsLmNvbS9zaW1wbGUtZW5jcnlwdCAgICAgICAgIHxcIik7XG5jb25zb2xlLmluZm8oXCIrLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcIik7XG5cbnZhciBlbmNvZGluZyA9IHtcbiAgbm9uZToge1xuICAgIHRvOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfSxcbiAgICBmcm9tOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuICB9LFxuICBiYXNlNjQ6IHtcbiAgICB0bzogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICByZXR1cm4gd2luZG93LmJ0b2EoZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmcpKSk7XG4gICAgfSxcbiAgICBmcm9tOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodW5lc2NhcGUod2luZG93LmF0b2Ioc3RyaW5nKSkpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gdXBkYXRlU3RhdHMoKSB7XG4gICQoXCIjc3RhdHNcIikuaHRtbCgkKFwiI3RleHRcIikudmFsKCkubGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gcGVyZm9ybShhY3Rpb24pIHtcbiAgdmFyIGN5cGhlciAgPSAkKFwiI2N5cGhlci1zdHJpbmctaW5wdXRcIikudmFsKCksXG4gICAgICB3cmFwcGVyID0gJChcIiNjeXBoZXItc3RyaW5nLXdyYXBwZXJcIiksXG4gICAgICB0ZXh0ICAgID0gJChcIiN0ZXh0XCIpLnZhbCgpO1xuXG4gIGlmIChjeXBoZXIubGVuZ3RoID4gMCkge1xuICAgIHZhciBlID0gbmV3IFNpbXBsZUVuY3J5cHQoY3lwaGVyKTtcbiAgICBhY3QoYWN0aW9uLCB0ZXh0LCBlKTtcbiAgfSBlbHNlIHtcbiAgICB3cmFwcGVyLmFkZENsYXNzKFwiaGFzLWVycm9yXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldFRleHQodGV4dCkge1xuICAkKFwiI3RleHRcIikudmFsKHRleHQpO1xufVxuXG5mdW5jdGlvbiBhY3QoYWN0aW9uLCB0ZXh0LCBzaW1wbGVFbmNyeXB0KSB7XG4gIHZhciBvdXRwdXRFbmNvZGVyID0gZW5jb2RpbmdbXCJub25lXCJdO1xuICBpZiAoJChcIiNlbmNvZGluZy1iYXNlNjRcIikuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgIG91dHB1dEVuY29kZXIgPSBlbmNvZGluZ1tcImJhc2U2NFwiXTtcbiAgfVxuICBpZiAoYWN0aW9uID09IFwiZW5jcnlwdFwiKSB7XG4gICAgc2V0VGV4dChvdXRwdXRFbmNvZGVyLnRvKHNpbXBsZUVuY3J5cHQuZW5jcnlwdCh0ZXh0KSkpO1xuICB9XG4gIGlmIChhY3Rpb24gPT0gXCJkZWNyeXB0XCIpIHtcbiAgICBzZXRUZXh0KHNpbXBsZUVuY3J5cHQuZGVjcnlwdChvdXRwdXRFbmNvZGVyLmZyb20odGV4dCkpKTtcbiAgfVxuICB1cGRhdGVTdGF0cygpO1xufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgJChcIiNidG4tZW5jcnlwdFwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHBlcmZvcm0oXCJlbmNyeXB0XCIpO1xuICB9KTtcbiAgJChcIiNidG4tZGVjcnlwdFwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHBlcmZvcm0oXCJkZWNyeXB0XCIpO1xuICB9KTtcbiAgJCgnI3RleHQnKS5iaW5kKCdpbnB1dCBwcm9wZXJ0eWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgIHVwZGF0ZVN0YXRzKCk7XG4gIH0pO1xufSk7IiwidmFyIGFzc2VydCA9IHtcbiAgdGVzdGVyczoge1xuICAgIGlzVHJ1ZTogZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIGEgPT09IHRydWU7XG4gICAgfSxcbiAgICBhcmVFcXVhbDogZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxuICB9LFxuICBpc1RydWU6IGZ1bmN0aW9uKGEsIG1lc3NhZ2UpIHtcbiAgICBpZighdGhpcy50ZXN0ZXJzLmlzVHJ1ZShhKSkge1xuICAgICAgdGhyb3cgbWVzc2FnZSA/IG1lc3NhZ2UgOiBhICsgXCIgaXMgbm90IHRydWVcIjtcbiAgICB9XG4gIH0sXG4gIGFyZUVxdWFsOiBmdW5jdGlvbihhLCBiLCBtZXNzYWdlKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RlcnMuYXJlRXF1YWwoYSxiKSkge1xuICAgICAgdGhyb3cgbWVzc2FnZSA/IG1lc3NhZ2UgOiBhICsgXCIgaXMgbm90IGVxdWFsIHRvIFwiICsgYjtcbiAgICB9XG4gIH1cbn07IiwidmFyIFNpbXBsZUVuY3J5cHQgPSBmdW5jdGlvbihrZXkpIHtcbiAgdGhpcy5rZXkgPSBrZXk7XG4gIGlmICghdGhpcy5rZXkgfHwgdGhpcy5rZXkubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgXCJBIGtleSBpcyByZXF1aXJlZFwiO1xuICB9XG4gIFxuICB0aGlzLmhhc2hlZEtleSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gbWQ1KHRoaXMua2V5KTsgfTtcblxuICB0aGlzLmVuY3J5cHQgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fZG9DcnlwdG8oc3RyaW5nLCB0aGlzLl9mb3J3YXJkKTtcbiAgfTtcblxuICB0aGlzLmRlY3J5cHQgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fZG9DcnlwdG8oc3RyaW5nLCB0aGlzLl9yZXZlcnNlKTtcbiAgfTtcblxuICB0aGlzLl9jYWxjdWxhdGVSZXN1bHQgPSBmdW5jdGlvbihzdHJpbmcsIG1vZGlmaWVyKSB7XG4gICAgdmFyIGNoYXJzID0gc3RyaW5nLnNwbGl0KFwiXCIpLFxuICAgICAgICByZXN1bHQgPSBcIlwiLFxuICAgICAgICBrZXlTdHJpbmdJbmRleCA9IDAsXG4gICAgICAgIGtleSA9IHRoaXMuaGFzaGVkS2V5KCk7XG4gICAgXG4gICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbihjaHIsIGluZGV4LCBhcnIpIHtcbiAgICAgIHZhciBvZmZzZXQgPSBrZXkuY2hhckNvZGVBdChrZXlTdHJpbmdJbmRleCksXG4gICAgICAgICAgbmV3VmFsdWUgPSBtb2RpZmllcihjaHIsIG9mZnNldCk7XG4gICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShuZXdWYWx1ZSk7XG4gICAgICBrZXlTdHJpbmdJbmRleCA9IGtleVN0cmluZ0luZGV4ICsgMSA+PSBrZXkubGVuZ3RoID8gMCA6IGtleVN0cmluZ0luZGV4ICsgMTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHRoaXMuX2ZvcndhcmQgPSBmdW5jdGlvbihjaHIsIG9mZnNldCkgeyByZXR1cm4gY2hyLmNoYXJDb2RlQXQoMCkrcGFyc2VJbnQob2Zmc2V0KTsgfVxuICB0aGlzLl9yZXZlcnNlID0gZnVuY3Rpb24oY2hyLCBvZmZzZXQpIHsgcmV0dXJuIGNoci5jaGFyQ29kZUF0KDApLXBhcnNlSW50KG9mZnNldCk7IH1cblxuICB0aGlzLl9kb0NyeXB0byA9IGZ1bmN0aW9uKHN0cmluZywgZGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0ZVJlc3VsdChzdHJpbmcsIGZ1bmN0aW9uKGNociwgb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gKGRpcmVjdGlvbihjaHIsIG9mZnNldCkpOyAgICAgICAgICBcbiAgICB9KTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
