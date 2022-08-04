export interface INews {
    title: string;
    author: string;
    createdAt: Date;
    url: string;
}

export function fetchNews(category: string): Promise<INews[]> {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=${category.toLocaleLowerCase()}&page=0`;
    return new Promise(resolve => {
        fetch(url).then(data => data.json()).then((data: any) => {
          resolve(data.hits.map((item: any) => ({
            title: item.story_title,
            author: item.author,
            createdAt: new Date(item.created_at),
            url: item.story_url,
          })))
        });
    });
}