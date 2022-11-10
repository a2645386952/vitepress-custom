export const navParser = (list: Array<{ relativePath: string; }> = [], root: string = '') => {
    let contents: Array<{}> = list.filter(i => i.relativePath.indexOf(`/${root}/`) >= 0);
    function buildNav(contents) {
        let list: any = [];
        for (let a of contents) {
            let regularPath = a.regularPath.split(`${root}/`)[1];
            let urls = regularPath.split('/');
            for (let i = 0, len = urls.length; i < len; i++) {
                let b = urls[i];
                let obj = {
                    text: b,
                    parent: i > 0 ? urls[i - 1] : undefined,
                    link: `/${root}/${urls.join('/')}`
                };
                if (b.indexOf('.html') < 0) {
                    list.push(obj);
                }
            }
        }
        // 排序
        var compare = function (obj1, obj2) {
            var val1 = obj1.link;
            var val2 = obj2.link;
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        };
        list = list.sort(compare);
        // filter all content that has parent 
        let childrenList = list.filter(i => i.parent);
        // Remove duplicate content
        function uniqueFunc(arr, uniId) {
            const res = new Map();
            return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
        }
        childrenList = uniqueFunc(childrenList, 'text');
        // 根目录
        let rootList: any = [];
        for (let i = 0, len = list.length; i < len; i++) {
            let item = list[i];
            if (!item.parent && !rootList.map(j => j.text)?.includes(item.text)) {
                rootList.push(item);
            }
        }
        rootList.map(item => {
            parseList(item);
        });
        function parseList(parent): any {
            let children = childrenList.filter(i => i.parent === parent.text);
            if (children.length > 0) {
                delete parent.link;
                for (let item of children) {
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