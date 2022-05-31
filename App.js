import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './component/home';
import Navbar from './component/Navbar/Navbar'

function App() {
  return (
    <div className="App">
 <BrowserRouter>
<Navbar/>
<Routes>
  <Route>
  <Home/>
  </Route>
  
</Routes>


 </BrowserRouter>
    </div>
  );
}

export default App;
