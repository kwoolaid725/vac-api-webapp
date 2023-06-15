import React from 'react'
import { Link } from 'react-router-dom'

let getTimestamp = (test) => {
    return test.last_modified
}
let trimmedContent = (test) => {
      //Slice content and add three dots in over 45 characters to show there is more
        let content = test.notes
        if (content.length > 20) {
                return content.slice(0, 20) + '...'
              } else {
                  return content
              }
}
const ListItem = ({test}) => {
  return (
    <Link to={`/tests/${test.id}`}>
      <div className='notes-list-item'>
        <h3>Test No. {test.id} {trimmedContent(test)}</h3>
          {test.category} {test.vac_type}
          <p><span>{getTimestamp(test)}</span></p>
      </div>
    </Link>
  )
}
export default ListItem