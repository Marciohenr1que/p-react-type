import Input from "../../components/form/input"
import { Link} from "react-router-dom"
import './style.css'
import { useState} from "react"
import { ApiLogin } from "../../services/user"
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)
  
  

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await ApiLogin(email, password)
      setLoginSuccess(true)
      console.log('Login bem-sucedido:', response.token)
      
    } catch (error) {
      console.error('Erro no login:', error)
      setLoginSuccess(false)
      alert('Login incorreto. Verifique suas credenciais.')
    }
  }

  return (
    <form>
      <div className="login-container">
        <h1>Arnia Trello</h1>
        <div className="form-group">
          <Input label="E-mail" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <Input label="Senha" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {loginSuccess ? (
          <Link to="/home" className="custom-button">ENTRAR</Link>
        ) : (
          <Link to="#" className="custom-button" onClick={handleLogin}>ENTRAR</Link>
        )}
        <Link to={'/cadastro'} className="cadastro">CADASTRAR</Link>
      </div>
    </form>
  )
}