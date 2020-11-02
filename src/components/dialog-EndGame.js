import React, { useState, useContext } from "react"
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import {GameInfoContext} from "../context/GameInfoContext.js"

const useStyle = makeStyles((theme) => ({
    endgame:{
        marginLeft: "10px"
      }
}))

export default function EndGame(){
    const classes = useStyle()
    const [open, setOpen] = useState(false)
    const gameInfo = useContext(GameInfoContext)

    function endGame(){
        //setOpen(false)
        const endGameData = {
            gameCode : sessionStorage.getItem("gameCode"), 
            email : sessionStorage.getItem("email")
        }
        gameInfo.socket.emit("endGame", endGameData)
        gameInfo.socket.on("newGameSet", (response)=>{
            sessionStorage.setItem("gameCode", response.gameCode)
            console.log("we got a new game !!!! ", response.gameCode)
            window.location.reload();

        })

    }
    function closeDialog(){
        setOpen(false)
    }
    function openDialog(){
        setOpen(true)
    }
    return (
        <div className={classes.endgame} >
            <Button onClick={openDialog} variant={"contained"}>End Game</Button>
            <Dialog
            open={open}
            onClose={closeDialog}
            ref={React.createRef()}
            >
                <DialogTitle>{"Press Confirm to End Game."}</DialogTitle>
                <DialogActions>
    <Button onClick={endGame}>{"Confirm"}</Button>
    <Button onClick={closeDialog}>{"Cancel"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}