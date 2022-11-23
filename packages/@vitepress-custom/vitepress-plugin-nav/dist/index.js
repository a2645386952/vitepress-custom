export var navParser = function (list, root) {
    if (list === void 0) { list = []; }
    if (root === void 0) { root = ''; }
    var contents = list.filter(function (i) { return i.relativePath.indexOf("/".concat(root, "/")) >= 0; });
    function buildNav(contents) {
        var list = [];
        for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
            var a = contents_1[_i];
            var regularPath = a.regularPath.split("".concat(root, "/"))[1];
            var urls = regularPath.split('/');
            for (var i = 0, len = urls.length; i < len; i++) {
                var b = urls[i];
                var obj = {
                    text: b.replace('.html', ''),
                    key: b,
                    parent: i > 0 ? urls[i - 1] : undefined,
                    link: "/".concat(root, "/").concat(urls.join('/'))
                };
                list.push(obj);
            }
        }
        // 排序
        var compare = function (obj1, obj2) {
            var val1 = obj1.link;
            var val2 = obj2.link;
            if (val1 < val2) {
                return -1;
            }
            else if (val1 > val2) {
                return 1;
            }
            else {
                return 0;
            }
        };
        list = list.sort(compare);
        // filter all content that has parent 
        var childrenList = list.filter(function (i) { return i.text.indexOf('.html') >= 0 || i.parent; });
        // Remove duplicate content
        function uniqueFunc(arr, uniId) {
            var res = new Map();
            return arr.filter(function (item) { return !res.has(item[uniId]) && res.set(item[uniId], 1); });
        }
        childrenList = uniqueFunc(childrenList, 'key');
        // 根目录
        var rootList = list.filter(function (i) { return !i.parent; });
        rootList = uniqueFunc(rootList, 'key'); //去重
        rootList.map(function (item) {
            parseList(item);
        });
        function parseList(parent) {
            var children = childrenList.filter(function (i) { return i.parent === parent.key; });
            if (children.length > 0) {
                delete parent.link;
                for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                    var item = children_1[_i];
                    parseList(item);
                }
                if (!parent.hasOwnProperty('items')) {
                    parent.items = children;
                }
            }
        }
        return rootList;
    }
    return buildNav(contents);
};
