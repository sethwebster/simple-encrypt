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