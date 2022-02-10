import React, { useState } from "react";
import styled from "styled-components";
import randomColor from "randomcolor";
import conway from '../conway.svg'


function Sequence() {
    const [fullArray, setFullArray] = useState([])
    const [custom, setCustom] = useState(false)
    const [going, setGoing] = useState(false)
    const [custNum, setCustNum] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [loading, setLoading] = useState(false)


const handleClick = () => {
    setLoading(true)

    const numArray = fullArray[fullArray.length - 1].match(/(.)\1*/g)

    const amounts = numArray.map(num => {
        return(
        `${num.length}` + `${num[0]}`
        )
    })
    
    const final = amounts.join('')

    setFullArray([...fullArray, final])
    
    // fullArray.push(final)
    setLoading(false)
    }


const toDefault = () => {
    setFullArray(['1'])
    setGoing(true)
    setCustom(false)
}

const toCustom = () => {
    setCustom(true)
    setGoing(false)
}

const handleSubmit = (e) => {
    e.preventDefault()
    setFullArray([`${custNum}`])
    setCustom(false)
    setGoing(true)
}

return(
    <div>
        <Container>
        <Header>Conway's Sequence</Header>
        <img src={conway}></img>
        <Button onClick={toDefault}>{!going ? `Use Default` : `Reset`}</Button>
        <br></br>
        <Button onClick={toCustom}>Use Custom Number</Button>
        {!custom ? null : 
        <form onSubmit={handleSubmit}>
            <Input required type='number' value={custNum} onChange={(e) => setCustNum(e.target.value)}/>
            <br></br>
            <Button type='submit'>Start</Button>
        </form>
        }
            {!going ? null : 
    <div>
                <label className="switch">
                <input type="checkbox" onChange={() => setIsChecked(!isChecked)}/>
                <span className="slider round"></span>
                </label>
                <br></br>
    </div>
    }  
    {
    !going ? null :
    fullArray.map(num => 
        <Ul key={num} color={isChecked ? randomColor : `black`}>{num}</Ul>
    )} 
    {!going ? null : 
    <div>
    <Button onClick={handleClick}>{!loading ? `Calculate Next` : `Calculating...`}</Button>
    </div>
    }  
    </Container>
    </div>
)
}

const Input = styled.input`
    width: 30vw;
    height: 5vh;
    border: none;
    border-bottom: 2px solid #7F7F7F;
    font-size: large;
    margin-bottom: 2vh;
    margin-left: 1vw;
    outline: none;
    background-color: rgb(83, 83, 83);

&:focus {
    outline: none;
    border-bottom: 2px solid #E3E3E3;

}
`;

const Button = styled.button`
height: 5vh;
width: 40vw;
font-weight: bold;
text-decoration: none;
text-align: center;
align-items: center;
color: rgb(37, 38, 51);
text-transform: uppercase;
letter-spacing: 1px;
transition: all .35s;
justify-content: center;
font-size: 1.5vh;
margin-top: 1vh;
margin-bottom: 2vh;
background-color: rgb(200, 200, 200);
border-radius: 5px;

`;

const Container = styled.div`
justify-content: center;
align-items: center;
text-align: center;
// overflow: none;
overflow-wrap: break-word;
`;

const Ul = styled.ul`
font-weight: bold;
color: ${props => props.color};
margin-right: 15vw;
margin-left: 5vw;
`;

const Header = styled.h1`
color: rgb(37, 38, 51);
text-transform: uppercase;
letter-spacing: 1px;
`;

export default Sequence

