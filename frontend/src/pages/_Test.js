import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'

// let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]
function TestFunction() {
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
                "category": test.category,
                "vac_type": test.vac_type,
                "test_status": test.test_status,
                "assigned1": test.assigned1,
                "assigned2": test.assigned2,
                "due_date": test.due_date,
                "complete_date": test.complete_date,
                "notes": test.notes,

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

    return (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1">
                    </input>
            </div>


    )
}

.