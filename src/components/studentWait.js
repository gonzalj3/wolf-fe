import React from "react"
import {Card, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        width: "52vw",
        height: "20vh",
        background: "#C4C4C4",
        borderRadius:"16px",
        fontFamily: "Jaldi",
        fontSize:"10vh",
        padding: "5vw",
        color: "white",
        WebkitTextStroke: "3px rgba(0, 0, 0, 1)",
        margin:"auto"
    },
    cardContainerIncorrect: {
        width: "52vw",
        height: "27vh",
        background: "#EF665E",
        borderRadius:"16px",
        fontFamily: "Jaldi",
        fontSize:"8vw",
        fontWeight: "64",
        textAlign: "center",
        display: "flex",
        color: "white",
        WebkitTextStroke: "3px #BE1F1F",
        margin:"auto"
    },
    cardContainerCorrect: {
        width: "52vw",
        height: "27vh",
        background: "#70a8d9",
        borderRadius:"16px",
        fontFamily: "Jaldi",
        fontSize:"8vw",
        fontWeight: "64",
        textAlign: "center",
        display: "flex",
        color: "white",
        WebkitTextStroke: "3px #245b8d",
        margin:"auto"
    }
}))
//const thing = "a string"

export default function StudentWaitBox(props) {
    const classes = useStyles()
    console.log("question props ", props)
    let css = classes.cardContainer

    if(props.message === "   Incorrect"){
        css = classes.cardContainerIncorrect
    } else if (props.message === "    Correct!"){
        css = classes.cardContainerCorrect
    } 
    
    return(
    <Card className={css}>{props.message}</Card>
    )
}