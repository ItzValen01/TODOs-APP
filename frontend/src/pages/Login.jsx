import { useState } from 'react';  
import axios from 'axios';  
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {  
    const { login } = useAuth();
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [error, setError] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setError(''); // Reiniciar errores  
        
        try {  
            const response = await axios.post('http://localhost:3001/api/users/login', {  
                username,  
                password,  
            });  

            login(response.data.token);
        } catch (err) {  
            setError(err.response?.data?.msg || 'Error al iniciar sesión');  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <div>  
                <label>Nombre de usuario:</label>  
                <input   
                    type="text"   
                    value={username}   
                    onChange={(e) => setUsername(e.target.value)}   
                    required   
                />  
            </div>  
            <div>  
                <label>Contraseña:</label>  
                <input   
                    type="password"   
                    value={password}   
                    onChange={(e) => setPassword(e.target.value)}   
                    required   
                />  
            </div>  
            {error && <div style={{ color: 'red' }}>{error}</div>}  
            <button type="submit">Iniciar sesión</button>  
        </form>  
    );  
};  

export default LoginForm;  