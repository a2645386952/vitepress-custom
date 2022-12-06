export interface childrenItemsType {
    text: string,
    key: string,
    parentKey: string | undefined;
    link?: string;
    items: childrenItemsType,
    collapsible: boolean | undefined,
    collapsed: boolean | undefined;
}
export interface pagesType {
    frontMatter: string,
    regularPath: string,
    relativePath: string,
    link: string,
    content: string;
}