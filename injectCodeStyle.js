const kCodeStyle = ['3024-day', '3024-night', 'abcdef', 'ambiance', 'ayu-dark', 'ayu-mirage', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'darcula', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'gruvbox-dark', 'hopscotch', 'icecoder', 'idea', 'isotope', 'lesser-dark', 'liquibyte', 'lucario', 'material', 'material-darker', 'material-palenight', 'material-ocean', 'mbo', 'mdn-like', 'midnight', 'monokai', 'moxer', 'neat', 'neo', 'night', 'nord', 'oceanic-next', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'shadowfox', 'solarized', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'yonce', 'zenburn'];

function constructLink(kCodeStyle) {
    for (let item of kCodeStyle) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://codemirror.net/theme/' + item + '.css';
        document.head.appendChild(link);
    }
}

function constructOptions(kCodeStyle) {
    var list = document.getElementById("toolBar").children[2];
    var newItem = document.createElement('select');
    newItem.className = 'inputForm vcenter';
    newItem.style.display = 'inline';
    newItem.title = 'change code style!';
    newItem.style.width = '80px';
    newItem.id = "setColorStyle"
    list.insertBefore(newItem, list.children[1]);

    for (let item of kCodeStyle) {
        var option = document.createElement("option");
        option.text = item;
        newItem.add(option);
    }
}

function injectJS() {
    var scr = document.createElement('script');
    scr.text = '\
    function selectTheme() {\
        var input = document.getElementById("setColorStyle");\
        var theme = input.options[input.selectedIndex].textContent;\
        gShaderToy.mCodeEditor.setOption("theme", theme);\
        console.log(theme);\
    }\
    document.getElementById("setColorStyle").onchange = selectTheme;'
    document.body.appendChild(scr);
}

constructLink(kCodeStyle);
constructOptions(kCodeStyle);
injectJS();
