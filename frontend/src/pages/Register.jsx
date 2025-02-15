// RegisterForm.jsx  
import { useRef, useState } from 'react';  
import axios from 'axios';  

const RegisterForm = () => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [error, setError] = useState('');  
    const [success, setSuccess] = useState('');  

    let timeoutRef = useRef(); 

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setError('');  
        setSuccess('');  

        try {  
            await axios.post('http://localhost:3001/api/users/register', {  
                username,  
                password,  
            });  
            
            setSuccess('Registro exitoso. Ahora te redirigiremos al inicio de sesión.'); 

            timeoutRef.current = setTimeout(() => {
                clearTimeout(timeoutRef.current);
            }, 2000);
        } catch (err) {  
            setError(err.response?.data?.msg || 'Error al registrarse');  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <div>  
                <label>Nombre de usuario:</label>  
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />  
            </div>  
            <div>  
                <label>Contraseña:</label>  
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />  
            </div>  
            {error && <div style={{ color: 'red' }}>{error}</div>}  
            {success && <div style={{ color: 'green' }}>{success}</div>}  
            <button type="submit">Registrarse</button>  
        </form>  
    );  
};  

export default RegisterForm;  