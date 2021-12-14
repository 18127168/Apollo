import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { LOAD_STUDENT } from "../GraphQL/Queries";
import { CREATE_STUDENT } from "../GraphQL/Mutation";
import { Table, Modal } from 'react-bootstrap'

export default function StudentList() {
    const { qError, loading, data } = useQuery(LOAD_STUDENT);
    const [createStudent, { mError }] = useMutation(CREATE_STUDENT);
    const [ students, setStudents] = useState([]);
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [sex, setSex] = React.useState("");
    const [show, setShow] = React.useState(false);

    const addNewStudent = async() => {
        let ageNum = parseInt(age, 10);
        if (isNaN(ageNum)) {
            ageNum = 0;
        }

        let sexBool = (sex === "male" || sex === "Male" || sex === "MALE");

        createStudent({
            variables: {
                name: name,
                age: ageNum,
                rating: rating,
                male: sexBool
            },
        });
    
        if (mError) {
            console.log(mError);
        } else {
            onHandleModalClose();
        }
    };

    useEffect(() => {
        console.log(data);
        if (data) {
          setStudents(data.getAllStudents);
        }
    }, [data]);

    const nameOnChangeHandler = (e) => setName(e.target.value);
    const ageOnChangeHandler = (e) => setAge(e.target.value);
    const ratingOnChangeHandler = (e) => setRating(e.target.value);
    const sexOnChangeHandler = (e) => setSex(e.target.value);
    const onHandleModalClose = () => setShow(false);
    const onHandleModalShow = () => setShow(true);

    return (
        <div style={ {padding: '5%', textAlign: 'right'} }>
            <div className='p-1'>
                <button type="submit" className="btn btn-success" onClick={onHandleModalShow}> Add Class </button>
            </div>
            <Table striped bordered hover>
            <thead>
                <tr className='text-center'>
                <th style={ {width: '40px' }}>No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Rating</th>
                <th>Sex</th>
                </tr>
            </thead>
            <tbody>
            {students.map((stud, index) => {
                return <tr> 
                    <td className='text-center'>{index}</td>
                    <td>{stud.name}</td>
                    <td>{stud.age}</td>
                    <td>{stud.rating}</td>
                    <td>{stud.male? "Male": "Female"}</td>
                </tr>;
            })}
            </tbody>
            </Table>
            <Modal show={show} onHide={onHandleModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>Adding Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="p-1">
                            <input type="text" className="form-control" placeholder="Name..." onChange={nameOnChangeHandler} />
                        </div>
                        <div className="p-1">
                            <input type="number" className="form-control" placeholder="Age..." onChange={ageOnChangeHandler} />
                        </div>
                        <div className="p-1">
                            <input type="text" className="form-control" placeholder="Rating..." onChange={ratingOnChangeHandler} />
                        </div>
                        <div className="p-1">
                            <input type="text" className="form-control" placeholder="Sex" onChange={sexOnChangeHandler} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center" style={{width: '100%'}}>
                        <button type="submit" className="btn btn-success" style={{width: '25%', margin:"2%"}} onClick={addNewStudent}> Add New </button>
                        <button className="btn btn-success" style={{width: '25%', margin:"2%"}} onClick={onHandleModalClose}> Close </button>
                    </div>
                </Modal.Footer>
            </Modal>
      </div>
    );
}