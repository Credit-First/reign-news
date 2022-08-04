interface Props {
  author: string;
  title: string;
  url: string;
  createdAt: Date;
  starred: boolean;
  toggleStar: () => void;
}

export default function NewsCard({ author, title, url, createdAt, starred, toggleStar }: Props) {
  return <div className="flex justify-between items-center rounded px-5 py-6 border border-gray-700">
    <div>
      <div className="flex items-center">
        <img className="mr-2" src="/icons/time.png" alt="time"/>
        <p className="text-tiny">3 hours ago by {author}</p>
      </div>
      <p className="font-medium font-roboto">{title}</p>
    </div>
    <div>
      <img className="cursor-pointer" onClick={toggleStar} src={`/icons/${starred ? 'star' : 'star-filled'}.png`} alt="star"/>
    </div>
  </div>
}