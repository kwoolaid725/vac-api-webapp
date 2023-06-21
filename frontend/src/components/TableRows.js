import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";



function TableRows({rowsData, deleteTableRows, handleChange, handleQuery}) {



    return(

        rowsData.map((data, index)=>{
            const {inv_no, brand, model_name, runs}= data;
            return(

                <tr key={index}>
                 <td>
                    {index+1}
                </td>

                    <td>
                        <Form>
                            <InputGroup>
                                <Form.Control value={inv_no} onChange={(e)=>(handleChange(index, e))} name="inv_no"  className="w-100" />
                            </InputGroup>
                        </Form>
                    </td>

                <td><input type="text" value={brand}   name="brand" className="form-control" disabled/> </td>
                <td><input type="text" value={model_name}   name="model_name" className="form-control" disabled/> </td>
                <td><input type="text" value={runs}  onChange={(e)=>(handleChange(index, e))} name="runs" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>c</button></td>
            </tr>

            )
        })


    )

}

export default TableRows;