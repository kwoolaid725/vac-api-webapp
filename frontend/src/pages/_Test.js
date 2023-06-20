import React, {useState, useEffect, useRef} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact"
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'
import Test from "./Test";
import SearchUser from '../components/SearchUser'
import Dropdown from 'react-bootstrap/Dropdown'

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

    const [user, setUser] = useState(null)
    const [users, setUsers] = useState(null);
    const [setvalue3, setValue3] = useState("")

    let getUser = async () => {
        console.log('Get user triggered')
        let response = await fetch('http://localhost:8000/users')
        let data = await response.json()
        setUser(data)
    }

    useEffect(() => {
        getUser()
        }, [])


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

    const userSelect = (e) => {
        console.log(e)
        setValue3(e)

    }

    const handleInput = (e) => {
        e.persist()
        setTest2({...test2, [e.target.name]: e.target.value});
    }



    return (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">TEST ID:</span>
                    </div>
                    VAC-0001
                </div>
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
                        <span className="input-group-text" id="basic-addon1">Assigned To:</span>
                    </div>

                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Tester 1</span>
                    </div>
                    <div>
                        <SearchUser placeholder="Search for user" data={items} />
                    </div>
                     <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Tester 2</span>
                    </div>
                    <div>
                        <SearchUser placeholder="Search for user" data={items} />
                    </div>
                </div>
                <div className="dates-box">
                    <div className="datetime">
                        last updated
                    </div>
                    <div className="datetime">
                        due date
                    </div>
                    <div className="datetime">
                        completion date
                    </div>
                </div>

                <div className="container">
                    <div className="subsidiary-test">
                    adfadfa

                    </div>
                    checkbox for subsidiary test according to test category and vac type
                    <ul>
                    <li>CR - Cordless</li>
                    CR - Robot
                    CR - Mop/WetDry
                    Field Test - Cordless
                    Field Test - Robot
                    Field Test - Mop/WetDry
                    Real-Use - Cordless
                    Real-Use - Robot
                    Real-Use - Mop/WetDry
                    </ul>
                    <div>
                        <ul>
                        <li>Test Category/Vac_Type -> Test_Target_Group -> CR_Corldess_Test_Measure or CR_Robot_Test_Measure or Other</li>
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
