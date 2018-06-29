var oop = require("../../node_modules/ace/lib/ace/lib/oop");
var TextMode = require("../../node_modules/ace/lib/ace/mode/text").Mode;
var Tokenizer = require("../../node_modules/ace/lib/ace/tokenizer").Tokenizer;
var LogHighlightRules = require("./syntaxHighlighter").LogHighlightRules;

var LogMode = function() {
  this.HighlightRules = LogHighlightRules;
};
oop.inherits(LogMode, TextMode);

(function() {}.call(LogMode.prototype));

exports.LogMode = LogMode;
