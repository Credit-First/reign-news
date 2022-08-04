import { getStarList } from "./local-storage.service";

export interface INews {
    title: string;
    author: string;
    createdAt: Date;
    url: string;
    id: string;
}

export function fetchNews(category: string, page = 0): Promise<INews[]> {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=${category.toLocaleLowerCase()}&page=${page}`;
    return new Promise(resolve => {
        fetch(url).then(data => data.json()).then((data: any) => {
          resolve(data.hits.map((item: any) => ({
            title: item.story_title,
            author: item.author,
            createdAt: new Date(item.created_at),
            url: item.story_url,
            id: `${item.story_id}_${item.author}`,
          })))
        });
    });
}

export function getFavNews(category: string): Promise<INews[]> {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${category.toLocaleLowerCase()}&page=0&hitsPerPage=1000`;
  const starList = getStarList();
    return new Promise(resolve => {
        fetch(url).then(data => data.json()).then((data: any) => {
          resolve(data.hits.map((item: any) => ({
            title: item.story_title,
            author: item.author,
            createdAt: new Date(item.created_at),
            url: item.story_url,
            id: `${item.story_id}_${item.author}`,
          })).filter((news: any) => starList.indexOf(news.id) >= 0));
        });
    });
}