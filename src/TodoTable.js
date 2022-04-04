import React from 'react';
import './App.css'

function TodoTable(props) {
  return (
    <div>
      <table>
        <tbody>
          {
            props.todos.map((todoItems, index) =>
              <tr key={index}>
                <td>{todoItems.date}</td>
                <td>{todoItems.description}</td>
              </tr>)
          }
        </tbody>
      </table>   
    </div>
  );
}

export default TodoTable;