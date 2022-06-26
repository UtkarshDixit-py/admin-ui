import styled from "styled-components";

export const Container =  styled.div`
    margin: 10px;
    margin-left: 220px;
    width: 70%;
    padding: 20px 20px;
    height: 70%;
    overflow: auto; 
    border: 2px solid grey; 
    background-color: white; 
    box-shadow: 0px 0px 5px 5px grey;
    border-radius: 5px
    z-index:0;
`

export const ModalBackground = styled.div`

width: 100vw;
height: 100vh;
position: fixed;
display: flex;
justify-content: center;
align-items: center;

`
export const ModalContainer = styled.div`


width: 500px;
height: 400px;
border-radius: 12px;
background-color: white;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
display: flex;
flex-direction: column;
padding: 25px;

`



export const CloseModalBtn = styled.div`

display: flex;
justify-content: flex-end;

`