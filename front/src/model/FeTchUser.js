import react, {useEffect} from 'react';
import axiosConfig from '../config/axiosConfig';
 function Fetchuser(){
    useEffect(()=>{
        axiosConfig.get('http://localhost:5000/api/v1/employee')
        .then(res => console.log(res))
    },[])
return(
    <div>Fetchuser</div>
) 
}
export default Fetchuser