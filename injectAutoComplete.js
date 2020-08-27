function injectAutoCompleteLink() {
    {
        var link = document.createElement("link");
        link.href = "https://codemirror.net/addon/hint/show-hint.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }
    {
        var scr = document.createElement('script');
        scr.src = "https://codemirror.net/addon/hint/css-hint.js";
        document.head.appendChild(scr);
    }
    {
        var scr = document.createElement('script');
        scr.src = "https://codemirror.net/addon/hint/show-hint.js";
        document.head.appendChild(scr);
    }
}

function injectAutoCompleteCode() {
    var scr = document.createElement('script');
    scr.text = '\
gShaderToy.mCodeEditor.on("keyup", function (cm, event) {\n\
    if (!cm.state.completionActive && event.keyCode >= 48 && event.keyCode <= 90) {\n\
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});\n\
        console.log(event.keyCode);\n\
    }\n\
});'
        +
        '\
// CodeMirror, copyright (c) by Marijn Haverbeke and others\n\
// Distributed under an MIT license: https://codemirror.net/LICENSE\n\
\n\
(function(mod) {\n\
  if (typeof exports == "object" && typeof module == "object") // CommonJS\n\
    mod(require("../../lib/codemirror"));\n\
  else if (typeof define == "function" && define.amd) // AMD\n\
    define(["../../lib/codemirror"], mod);\n\
  else // Plain browser env\n\
    mod(CodeMirror);\n\
})(function(CodeMirror) {\n\
  "use strict";\n\
\n\
  var WORD = /[\\w$]+/, RANGE = 500;\n\
\n\
  CodeMirror.registerHelper("hint", "anyword", function(editor, options) {\n\
    var word = options && options.word || WORD;\n\
    var range = options && options.range || RANGE;\n\
    var cur = editor.getCursor(), curLine = editor.getLine(cur.line);\n\
    var end = cur.ch, start = end;\n\
    while (start && word.test(curLine.charAt(start - 1))) --start;\n\
    var curWord = start != end && curLine.slice(start, end);\n\
\n\
    var list = options && options.list || [], seen = {};\n\
    var re = new RegExp(word.source, "g");\n\
    for (var dir = -1; dir <= 1; dir += 2) {\n\
      var line = cur.line, endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;\n\
      for (; line != endLine; line += dir) {\n\
        var text = editor.getLine(line), m;\n\
        while (m = re.exec(text)) {\n\
          if (line == cur.line && m[0] === curWord) continue;\n\
          if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {\n\
            seen[m[0]] = true;\n\
            list.push(m[0]);\n\
          }\n\
        }\n\
      }\n\
    }\n\
    return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};\n\
  });\n\
});'
    document.body.appendChild(scr);
    console.log("aaaa");

}

function injectAutoComplete() {
    injectAutoCompleteLink();
    injectAutoCompleteCode();
}