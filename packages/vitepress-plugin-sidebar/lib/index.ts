export const sidebarParser = (pages: any) => {
    let rootNameList: any = [];
    let childrenList: any = [];
    for (let a of pages) {
        // generate root dir name list
        let rootName = a.regularPath.replace('docs/', '').split('/').filter((i:any, n:number) => i.indexOf('.html') < 0 && n < 4).join('/') + '/';
        rootNameList.push(rootName);

        let urls = a.regularPath.replace('/docs/', '').split('/');
        for (let i = 0, len = urls.length; i < len; i++) {
            let b = urls[i];
            let obj = {
                text: b.replace('.html', ''),
                key: b,
                parentKey: (i > 0) ? urls[i - 1] : undefined,
                link: `/${urls.join('/')}`
            };
            childrenList.push(obj);
        }
    }
    rootNameList = rootNameList.filter(i => i !== '/');
    rootNameList.sort();
    // compare
    function compare(obj1: any, obj2: any) {
        var val1 = obj1.text;
        var val2 = obj2.text;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
    childrenList = childrenList.sort(compare);
    // 去重
    function unique(arr: any, unikey = '') {
        const res: any = new Map();
        return arr.filter((item: any) => !res.has(unikey ? item[unikey] : item) && res.set(unikey ? item[unikey] : item, 1));
    }
    rootNameList = unique(rootNameList);
    let obj: any = {};
    for (let c of rootNameList) {
        obj[c] = [{
            text: c.split('/').filter(i => i).splice(-1, 1)[0],
            key: c.split('/').filter(i => i).splice(-1, 1)[0],
            parentKey: undefined
        }];
    }
    for (let t in obj) {
        parseList(obj[t][0]);
    }
    function parseList(item: any) {
        let children = childrenList.filter(i => item.key === i.parentKey);
        children = unique(children, 'key');
        if (children) {
            for (let a of children) {
                parseList(a);
            }
            !(item.hasOwnProperty('link') && item.key.indexOf('.html') >= 0) && delete item.link;
            item.items = children;
        }
    }

    return obj;
};