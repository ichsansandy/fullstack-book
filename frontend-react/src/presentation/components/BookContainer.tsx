import { Action, Book } from '../../data/types';
import BookCard from './BookCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../data/url';

export default function BookContainer({ action }: { action: Action }) {
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/books/${action}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        setBookList(response.data.data.booksAvailable);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${action === 'available' ? 'bg-purple-200' : 'bg-slate-100'} w-full p-4 rounded-lg flex flex-col`}>
      <h1 className="text-3xl mb-7">{action === 'available' ? 'Book Available for Rent' : 'Your Rent'}</h1>
      <div className="flex flex-wrap justify-center gap-3">
        {Array.isArray(bookList) && bookList.length === 0 ? (
          <div className="text-slate-400">You don't have any books {action}</div>
        ) : (
          bookList?.map((book) => (
            <BookCard
              book={book}
              action={action}
            />
          ))
        )}
      </div>
    </div>
  );
}
