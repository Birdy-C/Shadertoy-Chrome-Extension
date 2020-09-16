function injectColorPickerCode() {
    {
        var scr = document.createElement('div');
        scr.innerHTML = '\
<input type="color" id="html5colorpicker" value="#ff0000">\n\
<button onclick="insert255()" style="background-color=#e7e7e7;">Insert [0-255]</button>\n\
<button onclick="insert1()" style="background-color=#e7e7e7;">Insert [0.0-1.0]</button>'
        var block = document.getElementsByClassName("block1")[0];
        block.insertBefore(scr, block.children[0]);
    }
    {
        var scr = document.createElement('script');
        scr.text = '\
function insertTextAtCursor(editor, text) {\
    var doc = editor.getDoc();\
    var cursor = doc.getCursor();\
    doc.replaceRange(text, cursor);\
}\n\
\
function getColor(mul255) {\
    var hex = document.getElementById("html5colorpicker").value;\
    var r = parseInt(hex.slice(1, 3), 16),\
        g = parseInt(hex.slice(3, 5), 16),\
        b = parseInt(hex.slice(5, 7), 16);\
    if(mul255) \
    {  return r.toString(10) + "," + g.toString(10) + "," + b.toString(10) }\
    r /= 255.; g /= 255.; b /= 255.; \
    r = r.toFixed(3); g = g.toFixed(3); b = b.toFixed(3);\
    return r.toString() + "," + g.toString() + "," + b.toString()\
}\n\
\
function insert1() {\
    insertTextAtCursor(gShaderToy.mCodeEditor, getColor(false))\
}\
\n\
function insert255() {\
    insertTextAtCursor(gShaderToy.mCodeEditor, getColor(true))\
}'
        document.body.appendChild(scr)
    }
}
function injectColorPicker() {
    injectColorPickerCode();
}