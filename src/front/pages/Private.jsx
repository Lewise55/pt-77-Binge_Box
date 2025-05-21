import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

export const Private = () => {

    const { store, dispatch, handle_getUser } = useGlobalReducer()
    const [message, setMessage] = useState("")  
    const [bio, setBio] = useState("")
    const [editBio, setEditBio] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if(token && !store.user) {
            handle_getUser(token)
        }
    }, [store.access_token])
    
    useEffect(() => {
        if(store?.user == null){
            setMessage("YOU MUST LOGIN FIRST")
        }else{
            setMessage(`Hello ${store.user.first_name}`)
        }
    }, [store.user])

    const handleBio = () => {
        setIsEditing(false);
    }

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        dispatch({
            type: "set_user",
            payload: { user: null, access_token: null },
        });
        navigate("/login");
    }

    return (
        <div className="text-center mt-2">
            <div className="containter-fluid">
                <div className="card">
                    <div className="card-header">
                        {message}
                    </div>
                    <div className="card-body">
                        <div className="d-flex">
                            <div className="d-flex flex-column col-4 mb-2">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSllHYt7njYkqDfNdEBcNHiNkOwov2NXCnC6Q&s" className="img-thumbnail mx-2" alt="..."/> 
                                {/* <!-- Button trigger modal --> */}
                                <button type="button" className="btn btn-info mt-3 w-50 mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Upload Photo
                                </button>

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Upload Photo</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>                            
                            {/* <div className="col-2">
                                <p>{store.user.first_name + " " + store.user.last_name}</p>
                                <p>{store.user.user_name}</p>
                                <p>{store.user.email}</p>
                            </div> */}
                            <div className="d-flex flex-column col-6 mx-3">
                                <div className="text-start mb-3">
                                    <p>{store.user.first_name + " " + store.user.last_name}</p>
                                    <p>{store.user.user_name}</p>
                                    <p>{store.user.email}</p>
                                </div>
                                <label className="mb-3">Bio:</label>
                                <div>                                
                                <textarea className="w-100"
                                    type="text"
                                    rows="10"
                                    value={bio}
                                    placeholder=" Write something about yourself..."
                                    onChange={(e) => setBio(e.target.value)}
                                />
                                </div>
                                <button className="btn btn-info w-50 mx-auto mt-2" onClick={(handleBio) => setIsEditing(true)}>Update Bio</button> 
                            </div>                                              
                        </div>                                                   
                    </div>
                </div>                              
            </div> 
            <button
                onClick={handleLogout} 
                className="btn btn-danger mt-3 mx-center">
                    Log Out
            </button>           
        </div>
    );
}; 