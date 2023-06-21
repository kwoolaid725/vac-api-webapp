import React, {useEffect, useState} from 'react';



let getTestId = (test) => {
    return test.id
}

const NewTestId = ({test}) => {
    return (
        <div className='test-id'>
            <h3>Test No. {getTestId(test)}</h3>
        </div>
    )
}
export default NewTestId