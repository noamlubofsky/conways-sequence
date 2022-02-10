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
    const [inputting, setInputting] = useState(false)
    const [guess, setGuess] = useState('')
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

const handleClick = () => {
    setLoading(true)
    setInputting(false)
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
    setInputting(false)
}

const toCustom = () => {
    setCustom(true)
    setGoing(false)
    setInputting(false)
}

const handleSubmit = (e) => {
    e.preventDefault()
    setFullArray([`${custNum}`])
    setCustom(false)
    setGoing(true)
}

const handleInput = (e) => {
    e.preventDefault()

    const numArray = fullArray[fullArray.length - 1].match(/(.)\1*/g)

    const amounts = numArray.map(num => {
        return(
        `${num.length}` + `${num[0]}`
        )
    })
    
    const final = amounts.join('')

    if(guess === final){
        setFullArray([...fullArray, final])
        setCorrect(true)
        setGuess('')
        setTimeout(() => {
            setCorrect(false)
        }, 1000)
    }else{
        setIncorrect(true)
        setTimeout(() => {
            setIncorrect(false)
        }, 1000)
    }
}

return(
    <div>
        <Container>
        <Header>Look-and-see Sequence</Header>
        <img src={conway}></img>
        <br></br>
        {!going ? null : 
    <div>
                <label className="switch">
                <input type="checkbox" onChange={() => setIsChecked(!isChecked)}/>
                <span className="slider round"></span>
                </label>
                <br></br>
    </div>
    }  
        <Button onClick={toDefault}>{!going ? `Use Default` : `Reset`}</Button>
        <Button onClick={toCustom}>Use Custom</Button>
        {!custom ? null : 
        <form onSubmit={handleSubmit}>
            <Input required type='text' value={custNum} onChange={(e) => setCustNum(e.target.value)}/>
            <br></br>
            <Button type='submit'>Start</Button>
        </form>
        }
            
    {
    !going ? null :
    fullArray.map(num => 
        <Ul key={num} color={isChecked ? randomColor : `black`}>{num}</Ul>
    )} 
    {!going ? null : 
    <div>
            {!inputting ? null : 
        <form onSubmit={handleInput}>
            {!correct && !incorrect ? <InputGuess required type='number' placeholder='Next in Sequence'value={guess} onChange={(e) => setGuess(e.target.value)}/> : null}
            {/* <br></br> */}
            {!correct ? null : <Correct>Correct!</Correct>}
            {!incorrect ? null : <Incorrect>Sorry, Incorrect</Incorrect>}
            <br></br>
            <Button type='submit'>Submit</Button>
        </form>
        }
    <Button onClick={() => setInputting(!inputting)}>Input Next</Button>
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

const InputGuess = styled.input`
    width: 50vw;
    height: 5vh;
    border: none;
    border-bottom: 2px solid #7F7F7F;
    font-size: large;
    margin-bottom: 2vh;
    margin-left: 1vw;
    outline: none;
    background-color: rgb(83, 83, 83);
    text-align: center;

&:focus {
    outline: none;
    border-bottom: 2px solid #E3E3E3;

}
`;

const Button = styled.button`
display: inline;
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

const Correct = styled.p`
color: green;
`;

const Incorrect = styled.p`
color: red;

`;

export default Sequence

