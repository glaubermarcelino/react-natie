import React , {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg'

export default function Register(){

    const [name,setName]            = useState('');
    const [email,setEmail]          = useState('');
    const [whatsapp,setWhatsApp]   = useState('');
    const [city,setCity]            = useState('');
    const [uf,setUF]                = useState('');

    const history = useHistory();

    async function handleRegister(e){
        //Desativa o recarregamento padrao do formulário ao submeter
        e.preventDefault();
        const data = {
                        name,
                        email,
                        whatsapp,
                        city,
                        uf
                    };
        try {
            const response  = await api.post('ongs',data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } 
        catch (error) 
        {
            alert('Erro ao cadastrar , tente novamente');
        }
    }

    return (
    <div className="register-container">
        <div className="content">
            <section>
            <img src={logoImg} alt="Be the Hero"/>
            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem  os casos de sua ONG.</p>
            
            <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o logon
            </Link>
            </section>
            <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Nome da ONG"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-Mail"
                      value={email}
                      onChange={e=> setEmail(e.target.value)}
                    />
                    <input type="text" placeholder="WhatsApp"
                      value={whatsapp}
                      onChange={e=> setWhatsApp(e.target.value)}
                    />
                <div className="input-group">
                    <input type="text" placeholder="Cidade"
                      value={city}
                      onChange={e=> setCity(e.target.value)}
                    />
                    <input type="text" placeholder="UF" style={{ width: 80}}
                      value={uf}
                      onChange={e=> setUF(e.target.value)}
                    />
                </div>
                <button className="button">Cadastrar</button>
            </form>
        </div>
        </div>
        );
    }