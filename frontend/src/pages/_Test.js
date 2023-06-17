import React, {useState, useEffect, useRef} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'
import Test from "./Test";
import Dropdown from 'react-bootstrap/Dropdown'

// let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]
export default function TestFunction() {
    let params = useParams()
    let navigate = useNavigate()
    let testId2 = params.id



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

        await fetch(`http://localhost:8000/_tests/${testId2}`,
            {method: 'DELETE'})
        navigate('/_tests')
    }


    const [setvalue, setValue] = useState("")

    const handleSelect = (e) => {
        if (e === "") {
            setValue("")
        } else {
            setValue(e)
        }
    }


    const handleInput = (e) => {
        e.persist()
        setTest2({...test2, [e.target.name]: e.target.value});
    }

    return (  <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">TEST ID:</span>
                    </div>
                    VAC-0001
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <Dropdown onSelect={handleSelect} >
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Test Category
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="CR">CR</Dropdown.Item>
                            <Dropdown.Item eventKey="Field Test">Field Test</Dropdown.Item>
                            <Dropdown.Item eventKey="Real-Use">Real-Use</Dropdown.Item>
                            <div role="separator" className="dropdown-divider"></div>
                            <Dropdown.Item eventKey="">Other</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>

                        {/*<input value = {setValue()} onChange={handleSelect} />*/}
                        <input type="text" className="form-control"
                               aria-label="Text input with dropdown button" aria-describedby="basic-addon1"
                              value = {setvalue} />
                               {/*value={test2?.category} onChange={handleInput} name="category"/>*/}





                    </div>
                </div>
                <p>vacuum type</p>
                 <p>assign to 1</p>
                 <p>assign to 2</p>
                 <p>due date</p>




        </div>
    )

}
