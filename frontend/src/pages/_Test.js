import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'

// let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]
const Test2 = () => {
    let params = useParams()
    let navigate = useNavigate()
    let test2Id = params.id

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
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to="/_tests">
                        <ArrowLeft />
                    </Link>
                </h3>
                {testId2 !== 'add' && <button onClick={deleteTest}>Delete</button>}
            </div>

            <textarea onChange={(e) => {
                setTest2({...test, "category": e.target.value})}} value={test2?.category}
                      placeholder="Add Category"></textarea>
            <textarea onChange={(e) => {
                setTest2({...test, "vac_type": e.target.value})}} value={test2?.vac_type}
                      placeholder="Add Vac Type..."></textarea>
            <textarea onChange={(e) => {
                setTest2({...test, "test_status": e.target.value})}} value={test2?.test_status}
                      placeholder="Add Test Status..."></textarea>
            <textarea onChange={(e) => {
                setTest2({...test, "assigned1": e.target.value})}} value={test2?.assigned1}
                      placeholder="Add Tester1..."></textarea>
            <textarea onChange={(e) => {
                setTest2({...test, "assigned2": e.target.value})}} value={test2?.assigned2}
                      placeholder="Add Tester2..."></textarea>
            <textarea onChange={(e) => {
                setTest2({...test, "due_date": e.target.value})}} value={test2?.due_date}
                      placeholder="Add Due Date..."></textarea>
            <textarea onChange={(e) => {
                setTest2({...test, "complete_date": e.target.value})}} value={test2?.complete_date}
                      placeholder="Add Completion Date..."></textarea>
            <textarea onChange={(e) => {
                setTest2({...test, "notes": e.target.value})}} value={test2?.notes}
                      placeholder="Add note..."></textarea>

                <div onClick={submitData} className="floating-button"><SaveIcon /></div>

        </div>
    )
}
export default Test2