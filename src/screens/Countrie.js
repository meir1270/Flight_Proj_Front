import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCountrie,
  getCountrieAsync,
  deleteCountrieAsync,
  addCountrieAsync,
} from "../app/countrieSlice";
import '../App.css'
import Table from 'react-bootstrap/Table';

const Countrie = () => {
  const [name, setName] = useState("")
  const myCountrie = useSelector(selectCountrie);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getCountrieAsync());
  }, []);

  return (
    <div>
      <div>
        <br /><br /><br /><br />
        <input onChange={(e) => setName(e.target.value)} />

        Countrie Name
        <button
          onClick={() =>
            dispatch(
              addCountrieAsync({
                name: name,
              })
            )
          }
        >
          Add Countrie
        </button>
      </div>
      <br /><br /><br /><br />
      Search by name: <input onChange={(e) => setSearch(e.target.value)} />
      <br />We have {myCountrie.length} Countries in my site


      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Countrie Name</th>
            <th>Image</th>
            <th></th>

          </tr>
        </thead>
        {myCountrie.length >0 && myCountrie
          .filter((x) =>
            x.name.includes(search))
          .map((countrie, i) => (
            <tbody key={i}>
              <tr>
                <td>{countrie.id}</td>
                <td>{countrie.name}</td>
                <td><img src={`./${countrie.image}`} alt={countrie.name}></img></td>
                <td>
                  <button onClick={() => dispatch(deleteCountrieAsync({ id: countrie.id }))} >
                    Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
};

export default Countrie;