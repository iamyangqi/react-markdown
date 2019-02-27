export const parseMarkdownDOM = (doms) => {
    if (!doms) {
        return ''
    }
    const len = doms.length;
    let isCode = false;
    let hasChange = false;

    for (let i=0; i<len; i++) {
        const dom = $(doms[i]);
        const text = dom[0].innerText;
        let newText = text;
        hasChange = false;

        /* 整行匹配 */
        if (/^\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-1');
        } else if (/^\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-2');
        } else if (/^\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-3');
        } else if (/^\#\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-4');
        } else if (/^\#\#\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-5');
        } else if (/^\#\#\#\#\#\#(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-header md-header-6');
        } else if (/^([-+*)]|(\d*\.))(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-list');
        } else if (/^\>(\s)+.*/.test(text)) {
            dom.removeClass().addClass('md-blockquote');
        } else if (/^\`\`\`([^\`])*/.test(text)) {
            if (isCode) {                               // 闭```时同样需要高亮
                dom.removeClass().addClass('md-code');
            }
            isCode = !isCode
        }

        const dels = text.match(/[~]{2}[^\~]+[~]{2}/g);
        const itatics = text.match(/((^[*]|(([^*])+[*]))[^\s\\*]+[*])|((^[_]|(([^_])+[_]))[^\s\\_]+[_])/g)
        const bolds = text.match(/((^[*]{2}|(([^*])+[*]{2}))[^\s\\*]+[*]{2})|((^[_]{2}|(([^_])+[_]{2}))[^\s\\_]+[_]{2})/g)

        if (dels) {
            hasChange = true;
            dels.forEach((d) => {
                newText = newText.replace(`${d}`, `<s>${d}</s>`)
            })
        }

        if (itatics) {
            hasChange = true;
            itatics.forEach((i) => {
                const t = i.match(/([*].+[*])|([_].+[_])/)
                newText = newText.replace(`${t[0]}`, `<i>${t[0]}</i>`)
            })
        }

        if (bolds) {
            hasChange = true;
            bolds.forEach((b) => {
                const t = b.match(/([**].+[**])|([_]{2}.+[_]{2})/)
                newText = newText.replace(`${t[0]}`, `<b>${t[0]}</b>`)
            })
        }

        if (hasChange) {
            dom.html(newText);
        }

        if (isCode) {
            dom.removeClass().addClass('md-code');
        }
    }

    return doms;
}
