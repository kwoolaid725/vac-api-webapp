import React, {useEffect, useState} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TestItem from "../components/_TestItem";
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'



export default function _Tests() {
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

    <div className='tests'>
        <div className="filter-header">
            <h2 className="notes-title">&#9782;Filters</h2>
            <p className="filter-count">{tests.length}</p>
            <Link to="/_tests/add" className="floating-button">
            <AddIcon />
              </Link>

        </div>
        <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
                <th scope='col' >ID</th>
                <th scope='col' >Category</th>
                <th scope='col' >Vacuum Type</th>
                <th scope='col' >Description</th>
                <th scope='col' >Test Samples</th>
                <th scope='col' >Testers</th>
                <th scope='col' >Status</th>
                <th scope='col' >Due Date</th>
                <th scope='col' >Completion Date</th>
                {/*<th scope='col'>Last Modified</th>*/}
                <th scope='col' >Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
          {tests.map((test) => (
            <tr>
                <td>
                    <Link to={`/_tests/${test.id}`}>
                        <div className='d-flex align-items-center'>
                            {test.id}
                        </div>
                    </Link>
                </td>
                <td>
                    <div className='d-flex align-items-center'>
                        {test.category}
                    </div>
                </td>
                <td>
                    <div className='d-flex align-items-center'>
                      {test.vac_type}

                    </div>
                </td>
                <td class="w-25" >
                    <div className='d-flex align-items-center'>

                    <TestItem key={test.id} test={test} />
                    </div>

                </td>
              <td className='align-top w-50'>

                <container>
                    <div className="row align-items-start">
                        <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                            1234
                        </div>

                       <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                           1234
                        </div>

                        <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                        </div>

                      <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                        </div>


                     <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                        </div>

                       <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                        </div>


                       <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                        </div>

                      <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                        </div>

                     <div className="col-md-3" >
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt=''
                                    style={{float:'left', width: '45px', height: '60px' }}
                                    className="border border-white"
                                />
                        </div>
                        </div>
                       </container>

                      </td>

                        <td >
                            <div className='d-flex align-items-center'>
                                Aiden Kim
                                 Ashley Benson
                            </div>
                         </td>

                      <td>
                        <MDBBadge color='success' pill>
                          Active
                        </MDBBadge>


                      </td>
                       <td className='align-middle w-50'>

                       2023-01-01
                      </td>
                          <td>

                        2023-01-01
                      </td>
                          <td>

                        <MDBBtn color='link' rounded size='sm'>
                          Edit
                        </MDBBtn>
                      </td>


            </tr>

          ))}


            {/*<tr>*/}
            {/*  <td>*/}
            {/*    <div className='d-flex align-items-center'>*/}
            {/*      <img*/}
            {/*        src='https://mdbootstrap.com/img/new/avatars/6.jpg'*/}
            {/*        alt=''*/}
            {/*        style={{ width: '45px', height: '45px' }}*/}
            {/*        className='rounded-circle'*/}
            {/*      />*/}
            {/*      <div className='ms-3'>*/}
            {/*        <p className='fw-bold mb-1'>Alex Ray</p>*/}
            {/*        <p className='text-muted mb-0'>alex.ray@gmail.com</p>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </td>*/}
            {/*  <td>*/}
            {/*    <p className='fw-normal mb-1'>Consultant</p>*/}
            {/*    <p className='text-muted mb-0'>Finance</p>*/}
            {/*  </td>*/}
            {/*  <td>*/}
            {/*    <MDBBadge color='primary' pill>*/}
            {/*      Onboarding*/}
            {/*    </MDBBadge>*/}
            {/*  </td>*/}
            {/*  <td>Junior</td>*/}
            {/*  <td>*/}
            {/*    <MDBBtn color='link' rounded size='sm'>*/}
            {/*      Edit*/}
            {/*    </MDBBtn>*/}
            {/*  </td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*  <td>*/}
            {/*    <div className='d-flex align-items-center'>*/}
            {/*      <img*/}
            {/*        src='https://mdbootstrap.com/img/new/avatars/7.jpg'*/}
            {/*        alt=''*/}
            {/*        style={{ width: '45px', height: '45px' }}*/}
            {/*        className='rounded-circle'*/}
            {/*      />*/}
            {/*      <div className='ms-3'>*/}
            {/*        <p className='fw-bold mb-1'>Kate Hunington</p>*/}
            {/*        <p className='text-muted mb-0'>kate.hunington@gmail.com</p>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </td>*/}
            {/*  <td>*/}
            {/*    <p className='fw-normal mb-1'>Designer</p>*/}
            {/*    <p className='text-muted mb-0'>UI/UX</p>*/}
            {/*  </td>*/}
            {/*  <td>*/}
            {/*    <MDBBadge color='warning' pill>*/}
            {/*      Awaiting*/}
            {/*    </MDBBadge>*/}
            {/*  </td>*/}
            {/*  <td>Senior</td>*/}
            {/*  <td>*/}
            {/*    <MDBBtn color='link' rounded size='sm'>*/}
            {/*      Edit*/}
            {/*    </MDBBtn>*/}
            {/*  </td>*/}
            {/*</tr>*/}
          </MDBTableBody>
        </MDBTable>
    </div>
  );
}