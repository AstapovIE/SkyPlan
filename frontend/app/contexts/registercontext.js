import {createContext, useState, useContext} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { redirect } from "next/navigation";


const Newcontext = createContext();

export const NewProvider = ({children})=>
    {
        const [user, setUser] = useState(null);

    const register = useCallback(async (username, password) => {
            try{
                const params = new URLSearchParams();
                params.append('username', username);
                params.append('password', password);
                const response = await axios.post('http://localhost:8000/auth/register',  { username, password},
                    {
                        headers:{ 'Content-Type': 'application/json'}
                    }
                );
                setUser({username});
                router.push('/survay');
            }
            catch(error){
                console.error('Login failed:', error);
            }
        };
        return ( 
        <Newcontext.Provider value={{user, register, error}}>
            {children}
        </Newcontext.Provider>
        );
    
};
    
export default Newcontext;