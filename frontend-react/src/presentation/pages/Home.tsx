import BookContainer from '../components/BookContainer';

export default function Home() {
  return (
    <div className="flex flex-col gap-3 p-2">
      <BookContainer action="available" />
      <BookContainer action="rent" />
    </div>
  );
}
