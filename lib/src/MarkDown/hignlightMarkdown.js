export var parseMarkdownDOM = function (doms) {
    if (!doms) {
        return '';
    }
    var len = doms.length;
    var isCode = false;
    var hasChange = false;
    var _loop_1 = function (i) {
        var dom = $(doms[i]);
        var text = dom[0].innerText;
        var newText = text;
        hasChange = false;
        /* 整行匹配 */
        if (/^\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-1');
        }
        else if (/^\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-2');
        }
        else if (/^\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-3');
        }
        else if (/^\#\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-4');
        }
        else if (/^\#\#\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-5');
        }
        else if (/^\#\#\#\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-6');
        }
        else if (/^([-+*)]|(\d*\.))(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-list');
        }
        else if (/^\>(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-blockquote');
        }
        else if (/^\`\`\`([^\`])*/.test(text)) {
            if (isCode) { // 闭```时同样需要高亮
                dom.removeClass().addClass('md-code');
            }
            isCode = !isCode;
        }
        var dels = text.match(/[~]{2}[^\~]+[~]{2}/g);
        var itatics = text.match(/((^[*]|(([^*])+[*]))[^\s\\*]+[*])|((^[_]|(([^_])+[_]))[^\s\\_]+[_])/g);
        var bolds = text.match(/((^[*]{2}|(([^*])+[*]{2}))[^\s\\*]+[*]{2})|((^[_]{2}|(([^_])+[_]{2}))[^\s\\_]+[_]{2})/g);
        if (dels) {
            hasChange = true;
            dels.forEach(function (d) {
                newText = newText.replace("" + d, "<s>" + d + "</s>");
            });
        }
        if (itatics) {
            hasChange = true;
            itatics.forEach(function (i) {
                var t = i.match(/([*].+[*])|([_].+[_])/);
                newText = newText.replace("" + t[0], "<i>" + t[0] + "</i>");
            });
        }
        if (bolds) {
            hasChange = true;
            bolds.forEach(function (b) {
                var t = b.match(/([**].+[**])|([_]{2}.+[_]{2})/);
                newText = newText.replace("" + t[0], "<b>" + t[0] + "</b>");
            });
        }
        if (hasChange) {
            dom.html(newText);
        }
        if (isCode) {
            dom.removeClass().addClass('md-code');
        }
    };
    for (var i = 0; i < len; i++) {
        _loop_1(i);
    }
    return doms;
};
//# sourceMappingURL=hignlightMarkdown.js.map