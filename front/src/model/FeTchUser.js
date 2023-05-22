import react, {useEffect} from 'react';
import axiosInstance from '../config/axiosConfig';
 function Fetchuser(){
    useEffect(()=>{
        axiosInstance.get('/employee')
        .then(res => console.log(res))
    },[])
return(
    <div>Fetchuser</div>
) 
}
export default Fetchuser