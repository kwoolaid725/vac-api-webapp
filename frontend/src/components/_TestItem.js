import React from 'react'
import { Link } from 'react-router-dom'

let getTimestamp = (test) => {
    return test.created_at
}


let trimmedContent = (test) => {
      //Slice content and add three dots in over 45 characters to show there is more
        let content = test.notes
        if (content.length > 100) {
                return content.slice(0, 100) + '...'
              } else {
                  return content
              }
}
const TestItem = ({test}) => {
  return (


      <div className='tests-list-item'>
        <div className='test-notes'> {trimmedContent(test)} </div>
      </div>

  )
}
export default TestItem