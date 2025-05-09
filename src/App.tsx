import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import TodoList from './pages/TodoList';
import TodoNew from './pages/TodoNew';
import TodoEdit from './pages/TodoEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/new" element={<TodoNew />} />
        <Route path="/edit" element={<TodoEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
