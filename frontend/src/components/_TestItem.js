import React from 'react'
import { Link } from 'react-router-dom'

let getTimestamp = (test2) => {
    return test2.created_at
}
let trimmedContent = (test2) => {
      //Slice content and add three dots in over 45 characters to show there is more
        let content = test2.notes
        if (content.length > 100) {
                return content.slice(0, 100) + '...'
              } else {
                  return content
              }
}
const TestItem = ({test2}) => {
  return (


      <div className='tests-list-item'>
        <div className='test-notes'> {trimmedContent(test2)} </div>
      </div>

  )
}
export default TestItem