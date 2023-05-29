import React from "react";
import trash from "../images/trash_icn.png"

export default function Todo(props) {

    const styles = {
        display: props.isShown ? "flex" : "none",
        textDecorationLine: props.isDone ? "line-through" : "none"
    }

    return(
        <div className="todo" style={styles}>
            <h3>{props.value}</h3>
            <input type="checkbox" onChange={props.setDone}/>
            <img src={trash} className="todo-trash" onClick={props.delete}/>
        </div>
       
    )
}