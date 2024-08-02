import {useState,useEffect} from 'react';
import {getEmployeeDetails} from '../api/getEmployeeDetails.jsx';
// import ScrollableFeed from 'react-scrollable-feed';

const Employee_details =() => {
    const [data,setData] = useState(null);
    const [apiResponse,setApiResponse] = useState(null);
    const [orderById,setOrderById] = useState(false);
    const [orderByName,setOrderByName] = useState(true);

    useEffect(()=>{
        const getData = async () => {
            try{
                const result = await getEmployeeDetails();
                setData(result.data.users);
                setApiResponse(result.data.users);
                console.log(data,"result");
            } catch(error){
                console.log(error);
            }
        };
        if(!data)
        getData();
    },[data]);

    const sortByID = () => {
        console.log("sort by decreasing")
        setOrderById(!orderById);
        const sortedData = [...data].sort((a,b)=>orderById ? (a.id-b.id):(b.id-a.id))
        setData(sortedData);
        console.log(data,"after sorting");
    }
    const sortByName = () => {
        console.log("sort by decreasing")
        setOrderByName(!orderByName)
        const sortedData = [...data].sort((a,b)=>orderByName ? (a.firstName.localeCompare(b.firstName)):(b.firstName.localeCompare(a.firstName)));
        setData(sortedData);
        console.log(data,"after sorting");
    }
    const filterByCountry = (e) => {
        if(e.target.value.toLowerCase()==="_"){
            console.log("gentfs");
            setData(apiResponse);
            return;
        }
        const filteredData = apiResponse?.filter((employee)=>employee.address.country.toLowerCase() === e.target.value.toLowerCase());
        setData(filteredData);
        console.log(data,"filter");
        console.log(e);
    }
    const filterByGender = (e) => {
        if(e.target.value.toLowerCase()==="_"){
            console.log("gentfs");
            setData(apiResponse);
            return;
        }
        const filteredData = apiResponse?.filter((employee)=>employee.gender.toLowerCase() === e.target.value.toLowerCase());
        setData(filteredData);
        console.log(data,"filter");
        console.log(e);
    }


    return(
        <>
        <div className="w-full">
        <div className="mx-4 flex justify-between items-center">
            <h1 className="text-3xl ">Employees</h1>
            <div className="flex gap-4 items-center ">
                <select name="Country" id="country" className="rounded px-4 py-1" onChange={filterByCountry}><option value="_">Country</option>
                <option value="United States">USA</option>
                <option value="India">India</option>
                <option value="United Kingdom">UK</option></select>
                <select name="Gender" id="gender" className="rounded px-4 py-1" onChange={filterByGender}><option value="_">Gender</option>
                <option value="Male" >Male</option>
                <option value="Female">Female</option></select>
            </div>
        </div>
        </div>
        <div className="mt-4 w-full flex justify-center  ">
        {/* <img src="https://dummyjson.com/icon/emilys/128" alt="" /> */}
        <div className="h-[90vh]  w-full mx-4 overflow-auto no-scrollbar rounded-lg">

    {/* <ScrollableFeed> */}

        <table className="table-fixed border-2 border-slate-600 text-left ">
            <thead className="">
                <tr className="font-semibold">
                    <th className=" px-4 py-2 w-[7%] font-semibold border-b-2 border-slate-300">ID <span className="cursor-pointer" onClick={sortByID}>&darr;</span><span className="cursor-pointer" onClick={sortByID}>&uarr;</span></th>
                    <th className=" px-4 py-1 font-semibold border-b-2 border-slate-300">Image</th>
                    <th className=" px-4 w-[30%] py-1 font-semibold border-b-2 border-slate-300">Full Name <span className="cursor-pointer" onClick={sortByName}>&darr;</span><span className="cursor-pointer" onClick={sortByName}>&uarr;</span></th>
                    <th className="w-[20%]  py-1 font-semibold border-b-2 border-slate-300">Demography</th>
                    <th className="  py-1 w-[25%] font-semibold border-b-2 border-slate-300">Designation</th>
                    <th className=" w-[20%] py-1 font-semibold border-b-2 border-slate-300">Location</th>
                </tr>
            </thead>
            <tbody>  
            {console.log(data)}
                {data?.map((item)=> (
                    <tr key={Math.random()}>                   
                    <td className=" px-4 py-2 border-b-2 border-slate-300">{item?.id}</td>
                    <td className="px-4 border-b-2 py-2 border-slate-300 "><div className="h-8 "><img src={item?.image} alt="no" className="w-8 rounded-full"/></div></td>
                    <td className=" px-4  py-2 border-b-2 border-slate-300">{item?.firstName} {item?.lastName}</td>
                    <td className="  py-2  border-b-2 border-slate-300">{item?.gender==="female"? ("F"):("M")}/{item?.age}</td>
                    <td className="  py-2 border-b-2 border-slate-300">{item?.company?.title}</td>
                    <td className="  py-2 border-b-2 border-slate-300">{item?.address?.state}, USA</td> 
                    </tr>
                ))}
             
              
              
            </tbody>
        </table>
        {/* </ScrollableFeed> */}

        </div>

        </div>
        </>
    )
}
export default Employee_details;