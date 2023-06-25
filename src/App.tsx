import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './page/Formulario';
import Participantes from './components/Participantes';
import Sorteio from './components/Sorteio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Formulario />}>
          <Route index element={<Participantes />} />
          <Route path='sorteio' element={<Sorteio />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
