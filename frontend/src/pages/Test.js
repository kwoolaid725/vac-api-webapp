import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'

// let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]
const Test = () => {
    let params = useParams()
    let navigate = useNavigate()
    let testId = params.id

    // let testItem = dummyData.find((test) => test.id === testId)

    let [test, setTest] = useState(null)

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

        navigate('/tests')

        }

    let deleteTest = async (e) => {
        e.preventDefault()

        await fetch(`http://localhost:8000/tests/${testId}`,
            {method: 'DELETE'})
        navigate('/tests')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to="/tests">
                        <ArrowLeft />
                    </Link>
                </h3>
                {testId !== 'add' && <button onClick={deleteTest}>Delete</button>}
            </div>

            <textarea onChange={(e) => {
                setTest({...test, "category": e.target.value})}} value={test?.category}
                      placeholder="Add Category"></textarea>
            <textarea onChange={(e) => {
                setTest({...test, "vac_type": e.target.value})}} value={test?.vac_type}
                      placeholder="Add Vac Type..."></textarea>
            <textarea onChange={(e) => {
                setTest({...test, "test_status": e.target.value})}} value={test?.test_status}
                      placeholder="Add Test Status..."></textarea>
            <textarea onChange={(e) => {
                setTest({...test, "assigned1": e.target.value})}} value={test?.assigned1}
                      placeholder="Add Tester1..."></textarea>
            <textarea onChange={(e) => {
                setTest({...test, "assigned2": e.target.value})}} value={test?.assigned2}
                      placeholder="Add Tester2..."></textarea>
            <textarea onChange={(e) => {
                setTest({...test, "due_date": e.target.value})}} value={test?.due_date}
                      placeholder="Add Due Date..."></textarea>
            <textarea onChange={(e) => {
                setTest({...test, "complete_date": e.target.value})}} value={test?.complete_date}
                      placeholder="Add Completion Date..."></textarea>
            <textarea onChange={(e) => {
                setTest({...test, "notes": e.target.value})}} value={test?.notes}
                      placeholder="Add note..."></textarea>

                <div onClick={submitData} className="floating-button"><SaveIcon /></div>

        </div>
    )
}
export default Test