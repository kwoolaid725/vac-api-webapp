import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ListItem from '../components/ListItem'
import { ReactComponent as AddIcon } from '../assets/add.svg'


// let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]
const Tests = () => {
    let [tests, setTests] = useState([])

    useEffect(() => {
        getTests()
    }, [])

    let getTests = async () => {
        let response = await fetch('http://localhost:8000/tests')
        let data = await response.json()
        setTests(data)
    }
    return (
    <div className='notes'>
        <div className="notes-header">
            <h2 className="notes-title">&#9782; Notes</h2>
            <p className="notes-count">{tests.length}</p>
        </div>
        <Link to="/tests/add">Add new test</Link>
      <div className="notes-list">
            {tests.map((test) => (
                <ListItem key={test.id} test={test} />
            ))}
      </div>
         <Link to="/tests/add" className="floating-button">
            <AddIcon />
      </Link>

    </div>
  )
}
export default Tests