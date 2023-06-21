import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import NewTestId from "./TestId";



export default function Testing() {
    let [tests, setTests] = useState([])

     let getTests = async () => {
            console.log('Get test triggered')
            let response = await fetch('http://localhost:8000/tests/')
            let data = await response.json()
            setTests(data)
        }

            useEffect(() => {
            getTests()
            }, [])

    console.log(tests)
    const max = Math.max.apply(Math, tests.map(function(o) { return o.id; }))
    console.log(max)

    // localStorage.setItem('tests', JSON.stringify(tests));
    // const items = JSON.parse(localStorage.getItem('tests'));
    //     console.log("tests: ", items)

    // let getTests = async () => {
    //     fetch('http://localhost:8000/tests/')
    //         .then(response => response.json())
    //         .then(data => setTests(data))
    // }

    
    // console.log(tests)
    // const maxId = tests[0].reduce(
    //     (prev, current) => {
    //         return (prev.id > current.id) ? prev : current
    //       });
    //
    // console.log(maxId);
    // const lastObject = numAscending.slice(-1)[0];
    // console.log(lastObject['id']);

    return (

            <h1>{max + 1}</h1>
       // <ul>
       //     {tests.map((test) => (
       //      <li>{test.id}</li>
       // ))}
       // </ul>

    )
}