import React, { useRef, useState } from "react";
import styled from "styled-components";
import randomColor from "randomcolor";
import conway from '../conway.svg'
import {isMobile} from 'react-device-detect';

function Sequence() {
    const [fullArray, setFullArray] = useState(['1'])
    const [custom, setCustom] = useState(false)
    const [going, setGoing] = useState(true)
    const [custNum, setCustNum] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputting, setInputting] = useState(false)
    const [guess, setGuess] = useState('')
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [shake, setShake] = useState(false);
    const [streak, setStreak] = useState(0);
    const [example, setExample] = useState(false)

const animate = () => {     
    setShake(true);
    setTimeout(() => setShake(false), 1000);
    
}

const handleClick = () => {
    setLoading(true)
    setInputting(false)
    setStreak(0)
    setGuess('')
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
    setCustNum('')
    setGuess('')
}

const toCustom = () => {
    setCustom(true)
    setGoing(false)
    setInputting(false)
    setFullArray([])
    setGuess('')
}

const handleSubmit = (e) => {
    e.preventDefault()
    if(
        custNum.includes("#")
    || custNum.includes("+")
    || custNum.includes("*")
    || custNum.includes(";")
    || custNum.includes(",")
    || custNum.includes("-")
    ){
animate()
setCustNum('')
    }else{
        setFullArray([`${custNum}`])
        setCustom(false)
        setGoing(true)
        setStreak(0)
    }
}

// const handleGuess = async(e) => {
// setGuess(e.target.value)
// const numArray = fullArray[fullArray.length - 1].match(/(.)\1*/g)
// const amounts = numArray.map(num => {
//     return(
//     `${num.length}` + `${num[0]}`
//     )
// })
// const final = amounts.join('')

// if(guess === final){
//     setCorrect(true)
// }else{
//     setCorrect(false)
// }
// }

const handleInput = (e) => {
    e.preventDefault()
    inputRef.current.focus();

    const numArray = fullArray[fullArray.length - 1].match(/(.)\1*/g)
    const amounts = numArray.map(num => {
        return(
        `${num.length}` + `${num[0]}`
        )
    })
    const final = amounts.join('')

    if(guess === final){
        setTimeout(() => {
            setFullArray([...fullArray, final])
            setStreak(streak + 1)
            setGuess('')

        }, 1000)
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false)
        }, 1000)
    }else{
        setStreak(0)
        setIncorrect(true)
        setTimeout(() => {
            setIncorrect(false)
        }, 1000)
        setCorrect(false)
        animate()
    }
}
const inputRef = useRef();

return(
    <div>
        <Container>
        <Header>Look-and-say Sequence</Header>
        <button onClick={() => setExample(!example)} class={'pushy__btn'}>{!example ? `Example` : `Hide`}</button>
        <br></br>
        {!example ? null : 
        <img src={conway}></img>}
        <br></br>

        <button class={'pushy__btn'} onClick={toDefault}>{!going ? `Use Default` : `Reset`}</button>
        <button class={'pushy__btn'} onClick={toCustom}>Use Custom</button>
        {!custom ? null : 
        <form onSubmit={handleSubmit}>
            <Input required className={shake ? `shake` : null} type="tel" value={custNum} onChange={(e) => setCustNum(e.target.value)}/>
            <br></br>
            <button class={'pushy__btn'} type='submit'>Start</button>
        </form>
        }
                    {!going ? null : 
    <div>
            <Color>add some color</Color>
            {/* <br></br> */}
                <label className="switch">
                <input type="checkbox" onChange={() => setIsChecked(!isChecked)}/>
                <span className="slider round"></span>
                </label>
                <br></br>
    </div>
    }  
    {
    // !going ? null :
    fullArray.map(num => 
        <div>
        <Ul key={num} mobile={isMobile ? `10` : `2.5`} color={isChecked ? randomColor : `black`}>{num}</Ul>
    </div>
    )} 
    {!going ? null : 
    <div>
            {!inputting ? null : 
                <form onSubmit={handleInput}>
                <InputGuess ref={inputRef} required className={shake ? `shake` : null} id={correct ? `correct` : `null`} type="tel" placeholder={!correct ? 'Next in Sequence' : 'Correct!'} value={guess} 
                color={correct ? 'rgb(0, 87, 0)' : null} onChange={(e) => setGuess(e.target.value)} />
                <br></br>
                <button class={'pushy__btn'} type='submit'>Submit</button>
                <Color>Your Streak: {streak}</Color>
            </form>
        }
    <button class={'pushy__btn'} onClick={() => setInputting(!inputting)}>{inputting ? `Hide Input` : `Input Next`}</button>
    <button class={'pushy__btn'} onClick={handleClick}>{!loading ? `Calculate Next` : `Calculating...`}</button>

    </div>
    }  
    </Container>
    <Footer>Look-and-say Sequence</Footer>
    </div>
)
}

const Input = styled.input`
    width: 30vw;
    height: 5vh;
    border: none;
    border-bottom: 2px solid #7F7F7F;
    font-size: large;
    font-weight: bold;
    margin-bottom: 2vh;
    margin-left: 1vw;
    outline: none;
    font-family: 'Cardo', serif;

    // background-color: rgb(83, 83, 83);
    background-color: #596870;
&:focus {
    outline: none;
    border-bottom: 2px solid #E3E3E3;
}
`;

const InputGuess = styled.input`
    width: 60vw;
    height: 5vh;
    border: none;
    border-bottom: 2px solid #7F7F7F;
    font-size: 1.5em;
    // font-weight: bold;
    margin-bottom: 2vh;
    margin-left: 1vw;
    outline: none;
    // background-color: rgb(83, 83, 83);
    background-color: #596870;
    font-family: 'Cardo', serif;

    text-align: center;
&:focus {
    outline: none;
border-bottom: 2px solid #36485f;
    border-bottom: 2px solid ${props => props.color};

}
`;

const Button = styled.button`
display: inline;
height: 5vh;
width: 40vw;
font-weight: bold;
text-decoration: none;
justify-content: center;
text-align: center;
align-items: center;
color: rgb(37, 38, 51);
text-transform: uppercase;
letter-spacing: 1px;
transition: all .35s;
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
min-height: 85vh;
`;

const Ul = styled.ul`
// font-weight: bold;
color: ${props => props.color};
margin-right: ${props => props.mobile}vw;
font-size: 1.5em;

`;

const Header = styled.p`
color: rgb(37, 38, 51);
// color: #263d45;
font-size: 2em;
text-transform: uppercase;
letter-spacing: 1px;
font-family: 'Times New Roman', Georgia, serif;
// border-bottom: 2px solid white;
`;

const Footer = styled.div`
bottom: 0;
float: bottom;
position: relative;
text-align: left;
color: rgb(37, 38, 51);
text-transform: uppercase;
letter-spacing: 1px;
padding: 10px;
margin-top: 5vh;
`;

const Color = styled.p`
// display: inline;
color: rgb(37, 38, 51);
text-transform: uppercase;
letter-spacing: 1px;
`;


export default Sequence