import { useState } from "react"
import AddDeleteTableRow from "./TableRowsTestVac"
import React from "react";
import TableRows from "./TableRows";

export default function TableRowsTestVacAutoFill({data}){


    const [rowsData, setRowsData] = useState([]);


    const addTableRows = ()=>{

        const rowsInput={
            brand:'',
            model_name:'',
            runs:''
        }
        setRowsData([...rowsData, rowsInput])

    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
   }


   const handleChange = (index, e)=>{

    const { name, value } = e.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);

}
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-12">

                <table className="table">
                    <thead>
                      <tr>
                            <th>#</th>
                            <th>INV NO</th>
                            <th>Brand</th>
                            <th className="th-lg">Model Name</th>
                            <th className="th-sm">Runs</th>
                            <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                      </tr>

                    </thead>
                   <tbody>

                   <AddDeleteTableRow data={rowsData} />

                   </tbody>
                </table>

                </div>
                <div className="col-sm-4">

                </div>
            </div>
        </div>
    )

}

