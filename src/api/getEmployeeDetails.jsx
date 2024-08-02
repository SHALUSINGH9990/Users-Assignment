import axios from 'axios';

export const getEmployeeDetails = async() => {
    try{
        const response = await axios.get('https://dummyjson.com/users');
        console.log(response,"res")
        return response;
    } 
    catch (error) {
        console.log(error);
    }
};
