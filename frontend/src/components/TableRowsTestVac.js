import {useEffect, useState} from "react"
import TableRows from "./TableRows"

import React from "react";



export default function AddDeleteTableRows(data){


    const [rowsData, setRowsData] = useState([]);


    const addTableRows = ()=>{

        const rowsInput={
            inv_no:'',
            brand:'',
            model_name:'',
            runs:'3',

        }
        setRowsData([...rowsData, rowsInput])
        console.log(rowsData)

    }
    const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

   // const

    const handleChange = (index, e)=>{

        const { name, value } = e.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }


    // Query for the table rows


    const [vacs, setVacs] = useState(null);
    let getVacs = async () => {
        console.log('Get user triggered')
        let response = await fetch('http://localhost:8000/vacuums')
        let data = await response.json()
        setVacs(data)
    }

      useEffect(() => {
          getVacs()
          }, [])


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

                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

                   </tbody>
                </table>

                </div>
                <div className="col-sm-4">

                </div>
            </div>
        </div>
    )

}
