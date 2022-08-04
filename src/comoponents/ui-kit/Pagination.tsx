import { useCallback } from 'react';
import { range } from '../../utils';

interface Props {
  className: string;
  page: number;
  maxPage: number;
  pageChanged?: (page: number) => void;
}

export default function Pagination({ className, page, pageChanged, maxPage }: Props) {
  const pageDiff = 4;
  const min = Math.max(0, page - pageDiff);
  const max = Math.min(page + pageDiff, maxPage - 1);
  const pages = range(min, max);

  const handleClick = useCallback(
    (page: number) => {
      pageChanged && pageChanged(page);
    },
    [page],
  );

  const handlePreClick = useCallback(() => {
    const prevPage: number = Math.max(0, page - 1);
    handleClick(prevPage);
  }, [page]);

  const handleNextClick = useCallback(() => {
    const nextPage: number = Math.min(maxPage, page + 1);
    handleClick(nextPage);
  }, [page]);

  return (
    <div className={className + ' flex justify-center items-center'}>
      <div
        className="cursor-pointer w-12 h-8 flex justify-center items-center font-roboto text-gray-500 text-center border rounded border-gray-800 m-1 md:m-2 "
        onClick={handlePreClick}
      >
        prev
      </div>
      {pages.map(p => (
        <div
          key={p}
          onClick={() => handleClick(p)}
          className={
            'cursor-pointer w-8 h-8 flex justify-center items-center font-roboto text-gray-500 text-center border rounded border-gray-800 m-1 md:m-2 ' +
            (p === page ? 'bg-primary border-primary text-white' : '')
          }
        >
          {p + 1}
        </div>
      ))}
      <div
        className="cursor-pointer w-12 h-8 flex justify-center items-center font-roboto text-gray-500 text-center border rounded border-gray-800 m-1 md:m-2 "
        onClick={handleNextClick}
      >
        next
      </div>
    </div>
  );
}
