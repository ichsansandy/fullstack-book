import Navbar from './presentation/components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './presentation/pages/Home';
import Login from './presentation/pages/Login';

function App() {
  return (
    <main className="flex justify-center p-4">
      <div className="flex flex-col w-full max-w-4xl border border-red-600">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;
