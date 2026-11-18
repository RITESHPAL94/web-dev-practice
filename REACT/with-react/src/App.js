import logo from './logo.svg';
import { useState } from 'react';
import "./App.css"
import Navbar from './component/Navbar';
import Footer from './component/Footer';

function App() {
  const [value, setValue] = useState(0)

  return (
    <div className="App">
      <Navbar logoText="Codewithritesh"/>
      <div className='value'>{value}</div>
      <button onClick={()=>{setValue(value + 1)}}>Click Me</button>
      <Footer/>
    </div>
  );
}

export default App;
