import { useCallback, useEffect, useState } from 'react';
import { fetchNews, INews } from '../api.service';
import NewsCard from '../comoponents/NewsCard';
import DropdownList from '../comoponents/ui-kit/DropdownList';
import TabControl from "../comoponents/ui-kit/TabControl";
import { addToStarList, getNewsCategory, getStarList, removeFromStarList, setNewsCategory } from '../local-storage.service';

const newsCategories = ["Angular", "React", "Vue"];

export default function Home() {
  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState(newsCategories.indexOf(getNewsCategory()));
  const [starList, setStarList] = useState(getStarList());

  const [news, setNews] = useState<INews[]>([]);
  useEffect(() => {
    setNewsCategory(newsCategories[category]);
    fetchNews(newsCategories[category]).then(setNews);
  }, [category]);

  const star = useCallback((id: string, starred: boolean) => {
    let list;
    if (starred) {
      list = addToStarList(id);
    } else {
      list = removeFromStarList(id);
    }
    setStarList(list);
  }, []);

  return <div className="container mx-auto">
    <header className="px-3 pt-11 pb-10 bg-gradient-to-b from-gray-900 to-white border-b border-slate-50/10">
      <h2 className="font-baskerville text-3xl text-gray-300">HACKER NEWS</h2>
    </header>
    <div className="p-3">
      <div className="flex justify-center pt-16 pb-14">
        <TabControl labels={['All', 'My faves']} selected={tab} tabChanged={setTab}/>
      </div>
      <div className="mb-9">
        <DropdownList
          options={newsCategories}
          selected={category}
          selectionChanged={setCategory}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-6">
        {news.map((item, index) => {
          const starred = starList.indexOf(item.id) >= 0;
          return <NewsCard key={item.id} {...item} starred={starred} toggleStar={() => star(item.id, !starred) }/>;
        })}
      </div>
    </div>
  </div>
}
