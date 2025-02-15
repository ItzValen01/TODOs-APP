import { Route, Navigate } from 'react-router-dom';  

const PrivateRoute = ({ component: Component, ...rest }) => {  
    const isAuthenticated = localStorage.getItem('token') ? true : false;  

    return (  
        <Route  
            {...rest}  
            render={props =>  
                isAuthenticated ? (  
                    <Component {...props} />  
                ) : (  
                    <Navigate to="/login" />  
                )  
            }  
        />  
    );  
};  

export default PrivateRoute;  