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
  var r = new RSAEncrypt();
  r.init();
  
});

