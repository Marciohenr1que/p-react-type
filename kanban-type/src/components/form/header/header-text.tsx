import { Link } from 'react-router-dom';
import './style-header.css'


function Headers1() {
  const userName = localStorage.getItem('userName')
  return (
  <header className="header">
  <div className="header-content">
    <div>
      <h1>Arnia Trello</h1>
    </div>
    <div className="user-info">
          <p>Olá, {userName }</p>
      <Link to={'/'} className="sair-link">Sair</Link>
    </div>
  </div>
</header>
  );
}

export default Headers1