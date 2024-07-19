import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const obj = [
    {
      id: 1,
      name: 'Varun',
      price: '100'
    },
    {
      id: 2,
      name: 'Ram',
      price: '200'
    },
    {
      id: 3,
      name: 'Shyam',
      price: '300'
    }
  ];

  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(obj);
  }, []);

  const handleEdit = (id) => {
    let dt = data.filter(item => item.id === id);
    if (dt.length > 0) {
      setIsUpdate(true);
      setName(dt[0].name);
      setPrice(dt[0].price);
      setId(id);
    }
  };

  const handelSave = (e) =>{
      e.preventDefault();

      let error = '';

      if(name=='')
        error += 'Name is require.';
      if(price=='')
        error += 'Price is require.';
      
      if(error == ''){
        let dt = [...data];
        let newObject = {
          id : obj.length + 1,
          name : name,
          price : price,
        }
        dt.push(newObject);
        setData(dt);
        handelClear();
      }else{
        alert(error)
      }
    }
    const handelUpdate = () =>{
      let index = data.map((item)=>item.id).indexOf(id);
      let dt = [...data];
      // console.log(index);

      dt[index].name = name;
      dt[index].price = price;
      setData(dt);
      handelClear();
    }

  const handleDelete = (id) => {
    let dt = data.filter(item => item.id !== id);
    setData(dt);
  };

  const handelClear = () =>{
        setIsUpdate(false);
        setId('');
        setName('');
        setPrice('');
    }

  return (
    <div className="App">
      <div style={{display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "10px"}}>
        <div>
          <label>Name:
          <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} />
          </label>
        </div>
        <div>
          <label>Price:
          <input type="text" name="price" onChange={(e)=>setPrice(e.target.value)} value={price} />
          </label>
        </div>
        <div>
          {
            !isUpdate ? <button className="btn btn-primary" onClick={(e)=>handelSave(e)}>Save</button>
            :<button className="btn btn-primary" onClick={()=>handelUpdate()}>Update</button>
          }
            <button className="btn btn-danger" onClick={()=>handelClear()}>Clear</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
