export default (list: Array<{ link: string }> = [], root: string = '') => {
  let contents: Array<{}> = list.filter((i) => i.link.indexOf(`${root}/`) >= 0);
  function buildNav(contents: any) {
    let list: any = [];
    for (let a of contents) {
      let link = a.link.split(`${root}/`)[1];
      let urls = link.split('/');
      for (let i = 0, len = urls.length; i < len; i++) {
        let b = urls[i];
        let obj = {
          text: b.replace('.md', ''),
          key: b,
          parent: i > 0 ? urls[i - 1] : undefined,
          link: `/${root}/${urls.join('/')}`
        };
        list.push(obj);
      }
    }
    // 排序
    var compare = (obj1: any, obj2: any) => {
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
    let childrenList = list.filter((i: any) => i.parent);

    // Remove duplicate content
    function uniqueFunc(arr: any, uniId: any) {
      const res = new Map();
      return arr.filter(
        (item: any) => !res.has(item[uniId]) && res.set(item[uniId], 1)
      );
    }
    childrenList = uniqueFunc(childrenList, 'key');

    // root directory
    let rootList: any = list.filter((i: any) => !i.parent);
    rootList = uniqueFunc(rootList, 'key'); // unique
    rootList.map((item: any) => {
      parseList(item);
    });
    function parseList(parent: any): any {
      let children = childrenList.filter((i: any) => i.parent === parent.key);
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
