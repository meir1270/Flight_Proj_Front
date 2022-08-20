import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
getUserAsync,deleteUserAsync,selectUser
} from "../app/userSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';

const Users = () => {
  const myUsers = useSelector(selectUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <div>
      <br /><br /><br /><br />
      Search by name: <input onChange={(e) => setSearch(e.target.value)} />
      <br />We have {myUsers.length} Users in my site


      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      {myUsers.length >0 && myUsers
      .filter((x) =>
      x.user.username.includes(search))
      .map((user,i) => (
      <tbody key={i}>
        <tr>
          <td>{user.id}</td>
          <td>{user.user.username}</td>
          <td>{user.user.email}</td>
          <td>{user.user_role.name_role}</td>
          <td>
          <button onClick={() => dispatch(deleteUserAsync({ id: user.id }))} >
              Delete</button>
          </td>
        </tr>
      </tbody>
      ))}
    </Table>
    </div>
  );
};

export default Users;