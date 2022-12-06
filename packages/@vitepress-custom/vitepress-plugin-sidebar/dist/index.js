/**
 * @param pages
 * @param root
 * @param collapsible
 * @returns {Array}
 */
export var sidebarParser = function (pages, root, collapsible) {
    if (root === void 0) { root = 'docs'; }
    if (collapsible === void 0) { collapsible = true; }
    var rootNameList = [];
    var childrenList = [];
    for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
        var a = pages_1[_i];
        // generate root dir name list
        var rootName = a.link.replace("".concat(root, "/"), '').split('/').filter(function (i, n) { return i.indexOf('.md') < 0 && n < 2; }).join('/');
        if (rootName.indexOf('/') >= 0) {
            rootNameList.push(rootName);
        }
        var urls = a.link.replace("".concat(root, "/"), '').split('/');
        for (var i = 0, len = urls.length; i < len; i++) {
            var b = urls[i];
            var obj = {
                text: b.replace('.md', ''),
                key: b,
                parentKey: (i > 0) ? urls[i - 1] : undefined,
                link: "/".concat(urls.join('/'))
            };
            childrenList.push(obj);
        }
    }
    rootNameList = rootNameList.filter(function (i) { return !['', '/'].includes(i); });
    rootNameList.sort();
    // compare
    function compare(obj1, obj2) {
        var val1 = obj1.text;
        var val2 = obj2.text;
        if (val1 < val2) {
            return -1;
        }
        else if (val1 > val2) {
            return 1;
        }
        else {
            return 0;
        }
    }
    childrenList = childrenList.sort(compare);
    // 去重
    function unique(arr, unikey) {
        if (unikey === void 0) { unikey = ''; }
        var res = new Map();
        return arr.filter(function (item) { return !res.has(unikey ? item[unikey] : item) && res.set(unikey ? item[unikey] : item, 1); });
    }
    rootNameList = unique(rootNameList);
    console.log('rootNameList', rootNameList);
    var sidebar = {};
    for (var _a = 0, rootNameList_1 = rootNameList; _a < rootNameList_1.length; _a++) {
        var c = rootNameList_1[_a];
        sidebar[c] = [{
                text: c.split('/').filter(function (i) { return i; }).splice(-1, 1)[0],
                key: c.split('/').filter(function (i) { return i; }).splice(-1, 1)[0],
                parentKey: undefined
            }];
    }
    for (var t in sidebar) {
        parseList(sidebar[t][0]);
    }
    function parseList(item) {
        var children = childrenList.filter(function (i) { return item.key === i.parentKey; });
        children = unique(children, 'key');
        if (children) {
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var a = children_1[_i];
                parseList(a);
            }
            !(item.hasOwnProperty('link') && item.key.indexOf('.md') >= 0) && delete item.link;
            item.items = children;
            item.collapsible = collapsible;
            item.collapsed = false;
        }
    }
    return sidebar;
};
