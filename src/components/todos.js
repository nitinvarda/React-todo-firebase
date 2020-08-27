import React, { useState, useEffect } from 'react';
import db from '../config';
import firebase from 'firebase';
const Todos = () => {
    const [todo, setTodo] = useState([]);
    const [input, setInput] = useState('')

    useEffect(() => {
        db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // console.log(snapshot.docs.map(doc => doc.data().todo))
            setTodo(snapshot.docs.map(doc => ({ id: doc.id, todos: doc.data() })))
        })
    }, [])


    const change = (e) => {
        setInput(e.target.value)

    }
    const Add = () => {
        db.collection('todos').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        })
        setInput("");
    }
    const del = (e) => {
        db.collection('todos').doc(e.target.id).delete()
    }

    return (
        <div>
            <label>Add :</label>
            <input type="text" name="todo" value={input} onChange={change} />
            <button onClick={Add}>Add</button>

            {todo.map((task) => {
                return (
                    <div key={task.id}>
                        <h1 >{task.todos.todo} </h1>
                        <p>date:{task.todos.date}</p>
                        <p> time:{task.todos.time}</p>
                        <button onClick={del} id={task.id}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default Todos;
