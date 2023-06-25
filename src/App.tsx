import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './page/Formulario';
import Participantes from './components/Participantes';
import { RecoilRoot } from 'recoil';
import Sorteio from './components/Sorteio';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/' element={<Formulario />}>
            <Route index element={<Participantes />} />
            <Route path='sorteio' element={<Sorteio />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
