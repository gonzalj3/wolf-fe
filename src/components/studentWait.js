import React from "react"
import {Card, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        width: "53vw",
        height: "27vh",
        background: "#D3D3D3",
        borderRadius:"16px",
        fontFamily: "Helvetica"
    }
}))
//const thing = "a string"

export default function StudentWaitBox(props) {
    const classes = useStyles()
    console.log("question props ", props)
    return(
    <Card className={classes.cardContainer}>{props.message}</Card>
    )
}