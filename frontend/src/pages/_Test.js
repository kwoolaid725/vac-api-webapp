import React, {useState, useEffect, useRef} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact"
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'
import Test from "./Test";
import SearchUser from '../components/SearchUser'
import SearchVac from '../components/SearchVac'
import AddDeleteTableRows from '../components/TableRowsTestVac'
import {vac_items} from '../components/SearchVac'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table';


// let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]
export default function TestFunction() {
    let params = useParams()
    let navigate = useNavigate()
    let testId2 = params.id
    let userId = params.id



    // let testItem = dummyData.find((test) => test.id === testId)

    let [test2, setTest2] = useState(null)

        useEffect(() => {
            if(testId2 !== 'add') getTest()
            }, [testId2])


    let getTest = async () => {
        console.log('Get test triggered')
        console.log(testId2)
        let response = await fetch(`http://localhost:8000/tests/${testId2}`)
        let data = await response.json()
        setTest2(data)
    }

    let submitData = async (e) => {
        e.preventDefault()
        let url = 'http://localhost:8000/tests'
        let method = 'POST'

        if (testId2 !== 'add') {
            url = `http://localhost:8000/tests/${testId2}`
            method = 'PUT'
        }

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                "id": test2.id,
                "category": test2.category,
                "vac_type": test2.vac_type,
                "test_status": test2.test_status,
                "assigned1": test2.assigned1,
                "assigned2": test2.assigned2,
                "due_date": test2.due_date,
                "complete_date": test2.complete_date,
                "notes": test2.notes,

            })
        })

        navigate('/_tests')

        }

    let deleteTest = async (e) => {
        e.preventDefault()

        await fetch(`http://localhost:8000/tests/${testId2}`,
            {method: 'DELETE'})
        navigate('/_tests')
    }


    const [setvalue1, setValue1] = useState("")
    const ref1 = useRef(null);

    const testSelect = (e) => {
        console.log(e)
        setValue1(e)

    }

    const testClear = () => {

       console.log(ref1.current.value)
       ref1.current.value =""
    }

    const [setvalue2, setValue2] = useState("")
    const ref2 = useRef(null);

    const vactypeSelect = (e) => {
        console.log(e)
        setValue2(e)

    }

    const vactypeClear = () => {

       console.log(ref2.current.value)
       ref2.current.value =""
    }

    const [users, setUsers] = useState(null);

    let getUsers = async () => {
        console.log('Get user triggered')
        let response = await fetch('http://localhost:8000/users')
        let data = await response.json()
        setUsers(data)
    }

        useEffect(() => {
            getUsers()
            }, [])


    localStorage.setItem('users', JSON.stringify(users));
    const items = JSON.parse(localStorage.getItem('users'));
        console.log("data: ", items)

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


    localStorage.setItem('vacs', JSON.stringify(vacs));
    const vac_items = JSON.parse(localStorage.getItem('vacs'));
          console.log("data: ", vac_items)


    const handleInput = (e) => {
        e.persist()
        setTest2({...test2, [e.target.name]: e.target.value});
    }



    return (
            <div>
                <div className="input-group divider">
                    <p className="left">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">TEST ID:</span>
                            </div>
                            <div className="col-xs-2">
                                <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={(e) => {
                                setTest2({...test2, "id": e.target.value})}} value={test2?.id} placeholder="ID No."/>
                            </div>
                        </div>

                    </p>

                    <p className="right">
                       <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">DUE DATE:</span>
                            </div>
                            <div className="col-xs-2">
                                <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={(e) => {
                                setTest2({...test2, "due_date": e.target.value})}} value={test2?.due_date} placeholder="Enter Due Date"/>
                            </div>
                           {/*last updated -----   completion date --------*/}
                        </div>

                    </p>



                </div>
                <div className="input-group divider">
                    <p className="left">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <Dropdown onSelect={testSelect} >
                                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Test Category
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item eventKey="CR">CR</Dropdown.Item>
                                    <Dropdown.Item eventKey="Field Test">Field Test</Dropdown.Item>
                                    <Dropdown.Item eventKey="Real-Use">Real-Use</Dropdown.Item>
                                    <div role="separator" className="dropdown-divider"></div>
                                    <div className="btn-group">
                                    <Dropdown.Item >
                                        <button type="button" data-display="static" className="btn btn1 w-100" onClick={() => testClear()}>Other</button></Dropdown.Item>
                                    </div>
                                  </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <input type="text" className="form-control" ref={ref1}
                                       aria-label="Text input with dropdown button" aria-describedby="basic-addon1"
                                      value = {setvalue1} />
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <Dropdown onSelect={vactypeSelect} id="2">
                                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Vacuum Type
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu id="2">
                                    <Dropdown.Item eventKey="Cordless">Cordless</Dropdown.Item>
                                    <Dropdown.Item eventKey="Robot">Robot</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mop/WetDry">Mop/WebDry</Dropdown.Item>
                                    <div role="separator" className="dropdown-divider"></div>
                                    <div className="btn-group">
                                    <Dropdown.Item >
                                        <button type="button" data-display="static" className="btn btn1 w-100" onClick={() => vactypeClear()}>Other</button></Dropdown.Item>
                                    </div>
                                  </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <input type="text" className="form-control" ref={ref2}
                                       aria-label="Text input with dropdown button" aria-describedby="basic-addon1"
                                      value = {setvalue2} />
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tester 1</span>
                            </div>
                             <div>
                            <SearchUser placeholder="Search for user" data={items} />
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tester 2</span>
                            </div>
                            <div>
                                <SearchUser placeholder="Search for user" data={items} />
                            </div>
                        </div>
                    </p>
                    <p className="right">

                        {/*<div className="input-group mb-3">*/}
                        {/*Test Samples*/}

                        {/*  <div className="input-group-prepend">*/}
                        {/*    <SearchVac placeholder="Search for vacuum sample" data={vac_items} />*/}
                        {/*  </div>*/}
                        {/*</div>*/}

                        <AddDeleteTableRows />


                        {/*<Table striped bordered hover size="sm">*/}
                        {/*  <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>Table</th>*/}
                        {/*        <th>INV NO</th>*/}
                        {/*        <th>Brand</th>*/}
                        {/*        <th className="th-lg">Model</th>*/}
                        {/*        <th className="th-sm">Runs</th>*/}
                        {/*    </tr>*/}
                        {/*  </thead>*/}
                        {/*  <tbody>*/}
                        {/*    <tr>*/}
                        {/*        <td>*/}
                        {/*           dsf*/}
                        {/*        </td>*/}
                        {/*        <td className="td-sm">*/}
                        {/*            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={(e) => {*/}
                        {/*        setTest2({...test2, "id": e.target.value})}} value={test2?.id} /></td>*/}
                        {/*        <td>Mark</td>*/}
                        {/*        <td>Otto</td>*/}
                        {/*        <td>@mdo</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*      <td>2</td>*/}
                        {/*      <td>Jacob</td>*/}
                        {/*      <td>Thornton</td>*/}
                        {/*      <td>@fat</td>*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*      <td>3</td>*/}
                        {/*      <td colSpan={2}>Larry the Bird</td>*/}
                        {/*      <td>@twitter</td>*/}
                        {/*    </tr>*/}
                        {/*  </tbody>*/}

                        {/*</Table>*/}


                    </p>
                </div>

                <button type="button" data-display="static" className="btn btn1 w-100" onClick={() => testClear()}>Other</button>

                <div className="container">
                    <div className="subsidiary-test">

                    </div>
                    checkbox for subsidiary test according to test category and vac type
                    <ul>
                    <li><h1>CR - Cordless</h1></li>
                    </ul>
                    <div>
                        <ul>
                        <li>Vacuums</li>
                        <li>Test Condition</li>
                        <li>Runs</li>
                        <li>Sample Inv. </li>
                        <li>Brush Type (if applicable)</li>
                        <li>Power Setting</li>
                        </ul>


                    </div>
                </div>

            </div>

    )
}
