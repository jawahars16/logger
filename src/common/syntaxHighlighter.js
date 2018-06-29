"use strict";

var oop = require("../../node_modules/ace/lib/ace/lib/oop");
var TextHighlightRules = require("../../node_modules/ace/lib/ace/mode/text_highlight_rules").TextHighlightRules;

var LogHighlightRules = function() {
  // regexp must not have capturing parentheses. Use (?:) instead.
  // regexps are ordered -> the first match is used
  this.$rules = {
    start: [
      {
        token: "comment", // String, Array, or Function: the CSS token to apply
        regex: "info" // String or RegExp: the regexp to match
      }
    ]
  };
};

oop.inherits(LogHighlightRules, TextHighlightRules);

exports.LogHighlightRules = LogHighlightRules;
