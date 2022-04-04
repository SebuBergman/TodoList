import './App.css'
//import TabApp from './TabApp.js';
import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Todolist() {
  const [todo, setTodo] = useState({desc: '', date: '', priority: ''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  // add to-do to the list
  const addTodo = () => {
    setTodos([todo, ...todos]);
    setTodo({desc: '', date: '', priority: ''});
  }

  //Check if the input is changed
  const inputChanged = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  // delete to-do from list
  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => gridRef.current.getSelectedNodes()[0].childIndex !== index));
    }
    else {
      alert('Select row first!')
    }
  }

  // ClearTodotable
  const clearTodo = (e) => {
    setTodos(todos.filter((todo, index) => index < 0));
  }

  const columns = [
    { field: "desc", sortable: true, filter: true, floatingFilter: true },
    { field: "date", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => format(params.value, 'dd.MM.yyyy') },
    { field: "priority", sortable: true, filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' } } // == if High = red : else = black            
  ];

  return (
    <div>
      <h1>Simple Todolist</h1>
      <h4>Add todo:</h4>
      <div direction="row" spacing={2} justifyContent="center" alignItems="center">
      </div>
        <div>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
              label="Description"
              variant="standard"
              name="desc"
              value={todo.desc}
              onChange={inputChanged}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DatePicker
                label="Date"
                value={todo.date}
                inputFormat="dd.MM.yyyy"
                mask="__.__.____"
                onChange={(newValue) => {
                  setTodo({...todo, date: newValue});
                }}
                renderInput={(params) => <TextField variant='standard' {...params} />}
              />
            </LocalizationProvider>
            <TextField
              label="Priority"
              variant="standard"
              name="priority"
              value={todo.priority}
              onChange={inputChanged}
            />
            <Button onClick={addTodo} variant="contained" className="buttonadd" startIcon={<AddIcon />}>Add</Button>
            <Button onClick={deleteTodo} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
            <Button onClick={clearTodo} variant="contained" className="buttonaclear">Clear</Button>
          </Stack> 
          
          <span id="animationAction"></span>
          <div className="ag-theme-material" style={{ width: 700, height: 400, margin: "auto"}}>
            <AgGridReact
              ref={gridRef}
              onGridReady={ params => gridRef.current = params.api}
              rowData={todos}
              columnDefs={columns}
              rowSelection="single"
              animateRows={true} >
            </AgGridReact>
          </div>
        </div>
    </div>
      );
}

export default Todolist;