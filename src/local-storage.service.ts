const starListKey = 'star-list';

export function getStarList(): string[] {
  const rawList = localStorage.getItem(starListKey) || '[]';
  return JSON.parse(rawList);
}

export function putStarList(list: string[]) {
  localStorage.setItem(starListKey, JSON.stringify(list));
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