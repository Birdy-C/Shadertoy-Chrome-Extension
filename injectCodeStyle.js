const kCodeStyle = ['ambiance', 'darcula', 'eclipse', 'elegant', 'lesser-dark', 'material-palenight', 'neat', 'neo', 'nord', 'oceanic-next', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'shadowfox', 'twilight', 'vibrant-ink', 'xq-light'];
var storedCodeStyle = 0

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
    newItem.id = "codeThemeStyle";
    newItem.onchange = updateCodeStyle;
    list.insertBefore(newItem, list.children[1]);

    {
        var option = document.createElement("option");
        option.text = 'default';
        newItem.add(option);
    }
    for (let item of kCodeStyle) {
        var option = document.createElement("option");
        option.text = item;
        newItem.add(option);
    }
    newItem.selectedIndex = storedCodeStyle;
}

function injectJS() {
    var scr = document.createElement('script');
    scr.text = '\
    var input = document.getElementById("codeThemeStyle");\n\
    function selectTheme() {\n\
        var theme = input.options[input.selectedIndex].textContent;\n\
        gShaderToy.mCodeEditor.setOption("theme", theme);\n\
        console.log(theme);\
    }\n\
    document.getElementById("codeThemeStyle").onchange = selectTheme;\n\
    selectTheme();\n'
    document.body.appendChild(scr);
}

function updateCodeStyle() {
    var input = document.getElementById("codeThemeStyle");
    storedCodeStyle = input.selectedIndex;
    chrome.storage.sync.set({ codestyle: storedCodeStyle }, function () {
        console.log(storedCodeStyle);
    });
}

function injectCodeStyle() {
    chrome.storage.sync.get('codestyle', function (data) {
        storedCodeStyle = data.codestyle;
        console.log(storedCodeStyle);
        constructLink(kCodeStyle);
        constructOptions(kCodeStyle);
        injectJS();
    });
}