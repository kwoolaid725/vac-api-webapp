import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";


function TableRows({rowsData, deleteTableRows, handleChange}) {

    let params = useParams()
    let navigate = useNavigate()
    let vacInv = params.inv_no

    let [vacuum, setVacuum] = useState(null)
    let [vacKey, setVacEntered] = useState("");

       useEffect(() => {
        if(vacInv !== 'add') getVacuum()
        }, [vacInv])

    let getVacuum = async () => {
        console.log('Get vacuum triggered')
        console.log(vacInv)
        // let response = await fetch(`http://localhost:8000/vacuums/${vacInv}`)
        let response = await fetch('http://localhost:8000/vacuums/')
        let data = await response.json()
        setVacuum(data)
    }



    return(

        vacuum && (
        rowsData.map((vacuum, index)=>{
            // const {inv_no, brand, model_name, runs}= data;
            return(

                <tr key={index}>
                 <td>
                    {index+1}
                </td>
                <td>
                 <input type="text" value={vacuum.inv_no} onChange={(e)=>(handleChange(index, e))} name="inv_no" className="form-control"/>
                </td>
                {/*<td><input*/}
                {/*    key = {vacuum.inv_no} type="text" value={vacuum.brand}  onChange={(e)=>(handleChange(index, e))} name="brand" className="form-control"/> </td>*/}
                {/*<td><input type="text" value={model_name}  onChange={(e)=>(handleChange(index, e))} name="model_name" className="form-control" /> </td>*/}
                {/*<td><input type="text" value={runs}  onChange={(e)=>(handleChange(index, e))} name="runs" className="form-control" /> </td>*/}
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>

            )
        }))


    )

}

export default TableRows;