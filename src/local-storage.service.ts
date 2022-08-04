const START_LIST_KEY = 'star-list';
const NEWS_CATEGORY_KEY = 'news-category';

export function getStarList(): string[] {
  const rawList = localStorage.getItem(START_LIST_KEY) || '[]';
  return JSON.parse(rawList);
}

export function putStarList(list: string[]) {
  localStorage.setItem(START_LIST_KEY, JSON.stringify(list));
}

export function addToStarList(id: string): string[] {
  const list = getStarList();
  if (list.indexOf(id) >= 0) {
    return list;
  }
  list.push(id);
  putStarList(list);
  return list;
}

export function removeFromStarList(id: string): string[] {
  const list = getStarList();
  const i = list.indexOf(id);
  if (i === -1) {
    return list;
  }
  list.splice(i, 1);
  putStarList(list);
  return list;
}

export function getNewsCategory(): string {
  return localStorage.getItem(NEWS_CATEGORY_KEY) || 'Angular';
}

export function setNewsCategory(category: string): void {
  localStorage.setItem(NEWS_CATEGORY_KEY, category);
}
