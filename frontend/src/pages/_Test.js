import React, {useState, useEffect, useRef} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import {  MDBFormInline, MDBIcon } from "mdbreact"
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Textarea } from "@material-tailwind/react";

import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'
import Test from "./Test";
import SearchUser from '../components/SearchUser'
import AddDeleteTableRows from '../components/TableRowsTestVac'
import {vac_items} from '../components/SearchVac'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table';
import TestItem from "../components/_TestItem";
import NewTestId from "../components/TestId";

// let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]
export default function TestFunction( ) {
    let params = useParams()
    let navigate = useNavigate()
    let testId = params.id
    let userId = params.id



    // let testItem = dummyData.find((test) => test.id === testId)

    let [test, setTest] = useState(null)
    let [tests, setTests] = useState([])

        useEffect(() => {
            if(testId !== 'add') getTest()
            }, [testId])


    let getTest = async () => {
        console.log('Get test triggered')
        console.log(testId)
        let response = await fetch(`http://localhost:8000/tests/${testId}`)
        let data = await response.json()
        setTest(data)
    }


    let submitData = async (e) => {
        e.preventDefault()
        let url = 'http://localhost:8000/tests'
        let method = 'POST'

        if (testId !== 'add') {
            url = `http://localhost:8000/tests/${testId}`
            method = 'PUT'
        }

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                "id": test.id,
                "category": test.category,
                "vac_type": test.vac_type,
                "test_status": test.test_status,
                "assigned1": test.assigned1,
                // "assigned2": test.assigned2,
                "due_date": test.due_date,
                "notes": test.notes,

            })
        })

        // navigate('/_tests')

        }

    let deleteTest = async (e) => {
        e.preventDefault()

        await fetch(`http://localhost:8000/tests/${testId}`,
            {method: 'DELETE'})
        // navigate('/_tests')
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
        // console.log("users: ", items)

    let getTests = async () => {
        console.log('Get test triggered')
        let response = await fetch('http://localhost:8000/tests/')
        let data = await response.json()
        setTests(data)
    }

        useEffect(() => {
        getTests()
        }, [])

    const maxId = Math.max.apply(Math, tests.map(function(o) { return o.id; }))

    const [inputVacarr, setInputVacarr] = useState([]);


    const [vactest, setVactest] = useState({
        test_id: "",
        vacuum_inv_no: ""
        }
    );

    const copyTestId = useRef(null);
    const handleTestidBlur = (e) => {
        copyTestId.current.value = maxId + 1
    }



    function handleVactestInput(e) {
        e.persist()
        setVactest({...vactest, [e.target.name]: e.target.value});

    }

    let {test_id, vacuum_inv_no} = vactest;
    function changeVacTest(e) {
        setInputVacarr([...inputVacarr,{test_id, vacuum_inv_no}])

        console.log("vactest: ", vactest)
        setVactest({
            test_id: "",
            vacuum_inv_no: ""
            }
        );
    }

    function changeVacTest2(e) {
        setInputVacarr([...inputVacarr,{test_id, vacuum_inv_no}])
        console.log(inputVacarr)
    }



    const handleInput = (e) => {
        e.persist()
        setTest({...test, [e.target.name]: e.target.value});
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
                                {/*<input type="text" className="form-control" name="id" aria-describedby="basic-addon1" value={maxId + 1} onChange={handleInput}/>*/}
                                 {/*// onBlur={handleTestidBlur}/>*/}
                                <input type="text" className="form-control" name="id" aria-describedby="basic-addon1" value={test?.id} onChange={handleInput}/>

                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Test Status:</span>
                            </div>
                             <div className="col-xs-2">
                                <input type="text" onChange={handleInput} value={test?.test_status} name="test_status" placeholder="Add Test Status..."></input>
                             </div>
                        </div>
                    </p>

                    <p className="right">
                       <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">DUE DATE:</span>
                            </div>
                            <div className="col-xs-2">
                                <input type="date" className="form-control" aria-describedby="basic-addon1" onChange={handleInput} value={test?.due_date} placeholder="Enter Due Date"/>
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
                                {/*<input type="text" className="form-control" ref={ref1}*/}
                                {/*       aria-label="Text input with dropdown button" aria-describedby="basic-addon1"*/}
                                {/*      value = {setvalue1} name="category" onChange={handleInput}/>*/}

                                <input type="text" className="form-control"
                                       aria-label="Text input with dropdown button" aria-describedby="basic-addon1"
                                      value = {test?.category} name="category" onChange={handleInput}/>
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
                                {/*<input type="text" className="form-control" ref={ref2}*/}
                                {/*       aria-label="Text input with dropdown button" aria-describedby="basic-addon1"*/}
                                {/*      value = {setvalue2} name="vac_type" onChange={handleInput}/>*/}

                                <input type="text" className="form-control"
                                       aria-label="Text input with dropdown button" aria-describedby="basic-addon1"
                                      value = {test?.vac_type} name="vac_type" onChange={handleInput}/>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tester 1</span>
                            </div>
                             <div>
                            {/*<SearchUser placeholder="Search for user" name="assigned1" data={items} onChange={handleInput} />*/}

                                 <input type="text" className="form-control"
                                       aria-label="Text input with dropdown button" aria-describedby="basic-addon1"
                                      value = {test?.assigned1} name="assigned1" onChange={handleInput}/>
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
                         <div className="relative w-[32rem]">
                               <Textarea variant="static" onChange={handleInput} name='notes' value={test?.notes} placeholder="Add note..." />
                           </div>

                        <div onClick={submitData} className="floating-button"><SaveIcon /></div>



                    {/*    <AddDeleteTableRows />*/}

                    {/*    /!*<input type="text" name="test_id" value={vactest.test_id} onChange={handleVactestInput} />*!/*/}
                    {/*    <MDBContainer>*/}
                    {/*        <MDBRow>*/}
                    {/*            <MDBCol size='sm'>*/}
                    {/*    <input type="text"  name="vacuum_inv_no" value={vactest.vacuum_inv_no} onChange={handleVactestInput} />*/}
                    {/*    <input type="text"  name="test_id"  value={vactest.test_id} onClick={handleVactestInput}*/}
                    {/*        ref={copyTestId} />*/}
                    {/*            </MDBCol>*/}
                    {/*        </MDBRow>*/}
                    {/*    </MDBContainer>*/}
                    {/*    <button onClick={changeVacTest}> Add </button>*/}
                    {/*    <button onClick={changeVacTest2}> Check Array in Console </button>*/}

                    {/*    <table border={1} cellPadding={10} >*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <th>Inv No.</th>*/}
                    {/*            <th>Test Id</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            {*/}
                    {/*                inputVacarr.map(*/}
                    {/*                    (info,index) => {*/}
                    {/*                        return(*/}
                    {/*                            <tr key={index}>*/}
                    {/*                                <td>{info.vacuum_inv_no}</td>*/}
                    {/*                                <td>{info.test_id}</td>*/}
                    {/*                            </tr>*/}
                    {/*                        )*/}
                    {/*                    }*/}
                    {/*                )*/}
                    {/*            }*/}
                    {/*        </tr>*/}
                    {/*    </tbody>*/}
                    {/*    </table>*/}

                    </p>

                </div>

                <button type="button" data-display="static" className="btn btn1 w-100" onClick={() => testClear()}>Other</button>

                <div className="container">
                    <div className="subsidiary-test">




                    </div>
                </div>

            </div>

    )
}
