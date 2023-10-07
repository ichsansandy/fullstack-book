import { type Book, type Action } from '../../data/types';

export default function BookCard({ book, action }: { book: Book; action: Action }) {
  return (
    <div
      id={book.code}
      className="max-w-xs w-1/4 bg-blue-100 hover:bg-blue-300 px-4 py-6 rounded-xl grid gap-2"
    >
      <h1 className="text-xl font-bold line-clamp-2">{book.title}</h1>
      <span className="mt-3 text-xs">by</span>
      <h5 className="text-sm">{book.author}</h5>
      <button
        type="button"
        className={`${
          action === 'available' ? 'bg-green-400' : 'bg-red-300'
        } mt-4 px-7 py-2 rounded-3xl  w-fit place-self-center hover:scale-110 transition-all`}
 
      >
        {action === 'available' ? 'Rent' : 'Return'}
      </button>
    </div>
  );
}
