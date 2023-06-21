import { Link } from "react-router-dom"
import Input from "../../components/form/input"
import './style-cadastro.css'
import { useState } from "react"
import { ApiCadastro } from "../../services/user"

type Register = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}
export default function Cadastro() {
    const [registerData, setRegisterData] = useState<Register>({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const handleCadastro = async () => {
        
        try {
      await ApiCadastro(registerData.email, registerData.password, registerData.name)
      alert('Usuário cadastrado com sucesso!')
    } catch (error) {
      console.error('Erro no cadastro:', error)
      alert('Erro ao cadastrar usuário.')
    }
  }
    return (
        <form>
     <div className="login-container">
        <h1>Arnia Trello</h1>
        <h3>Cadastro</h3>
      <div className="form-group">
       <Input label="Nome Completo" name="name" value={registerData.name} onChange={(e)=> setRegisterData({...registerData, name: e.target.value})} />
      </div>
      <div className="form-group">
        <Input label="E-mail" name="email" value={registerData.email} onChange={(e)=> setRegisterData({...registerData, email: e.target.value})}  />
        </div>
                <div className="form-group">
        <Input label="Senha" name="password" value={registerData.password} onChange={(e)=> setRegisterData({...registerData, password: e.target.value})} />
                </div>
                <div className="form-group">
        <Input label="Confirmar Senha" name="password" value={registerData.passwordConfirmation} onChange={(e)=> setRegisterData({...registerData, passwordConfirmation: e.target.value})} />
     </div>
    
                <Link to={'/'} onClick={handleCadastro} className="cadastro-link">CADASTRO</Link>
            </div>
            

        </form>
    )
}