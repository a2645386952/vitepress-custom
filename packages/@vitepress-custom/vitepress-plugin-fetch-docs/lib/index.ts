import fs from 'fs-extra';
import globby from 'globby';
import matter from 'gray-matter';

// Define the page type
interface Page {
  frontMatter: FrontMatter;
  link: string;
  content: string;
}

// Define the front metadata type
interface FrontMatter {
  page?: any;
  date?: any;
}

// Compare date function
const compareDate = (obj1: Page, obj2: Page) => {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
};

// Export default function
export default async () => {
  // Get all markdown file paths
  const paths = await globby(['**.md'], {
    ignore: ['node_modules', 'README.md', 'packages']
  });

  // Read all markdown file contents and parse metadata
  let pages: Page[] = await Promise.all(
    paths.map(async (item: string) => {
      const content = await fs.readFile(item, 'utf-8');
      const matterData = matter(content);
      return {
        frontMatter: matterData.data,
        link: item,
        content: matterData.content.replace(/[^a-zA-Z0-9._ ]+/g, '').toLowerCase()
      };
    })
  );

  // Filter out pages with frontMatter.page
  pages = pages.filter((item: Page) => !item.frontMatter.page);

  // Sort by date
  pages.sort(compareDate);

  return pages;
};

