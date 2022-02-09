import React, { useState } from "react";
import styled from "styled-components";
import randomColor from "randomcolor";

function Sequence() {
    const [fullArray, setFullArray] = useState([])
    const [custom, setCustom] = useState(false)
    const [going, setGoing] = useState(false)
    const [custNum, setCustNum] = useState('')
    const [count, setCount] = useState(0)
    const [isChecked, setIsChecked] = useState(false)


// const handleClick = () => {

// const numString = 
// (() => {
//     "use strict";
 
//     const main = () =>
//         group(array.at(-1))
//         .map(x => x.join(""))
//         .join(", ");

//     const group = xs =>
//         groupBy(a => b => a === b)(xs);
 
//      const groupBy = eqOp =>
//         xs => 0 < xs.length ? (() => {
//             const [h, ...t] = xs;
//             const [groups, g] = t.reduce(
//                 ([gs, a], x) => eqOp(x)(a[0]) ? (
//                     Tuple(gs)([...a, x])
//                 ) : Tuple([...gs, a])([x]),
//                 Tuple([])([h])
//             );
 
//             return [...groups, g];
//         })() : [];

//     const Tuple = a =>
//         b => ({
//             type: "Tuple",
//             "0": a,
//             "1": b,
//             length: 2,
//             *[Symbol.iterator]() {
//                 for (const k in this) {
//                     if (!isNaN(k)) {
//                         yield this[k];
//                     }
//                 }
//             }
//         });
 
//     return main();
// })();

// const numArray = numString.split(', ')

// const amounts = numArray.map(num => {
//     return(
//     `${num.length}` + `${num[0]}`
//     )
// })

// const final = amounts.join('')

// array.push(final)
// }


const testFunction = () => {
    fullArray.push(fullArray.at(-1).match(/(.)\1*/g).map(num => {
        return(
        `${num.length}` + `${num[0]}`
        )
    }).join('')
    )
    console.log(fullArray)
}

const handleClick = () => {

    setCount(count + 1)

    testFunction()

    // const numArray = array.at(-1).match(/(.)\1*/g)
        
    // const amounts = numArray.map(num => {
    //     return(
    //     `${num.length}` + `${num[0]}`
    //     )
    // })
    
    // const final = amounts.join('')
    
    // array.push(final)
    // console.log(array)

    // array.push(array.at(-1).match(/(.)\1*/g).map(num => {
    //     return(
    //     `${num.length}` + `${num[0]}`
    //     )
    // }).join('')
    // )

    }


const toDefault = () => {
    setFullArray(['1'])
    setGoing(true)
    setCustom(false)
    setCount(0)
}

const toCustom = () => {
    setCustom(true)
    setGoing(false)
    setCount(0)
}

const handleSubmit = (e) => {
    e.preventDefault()
    setFullArray([`${custNum}`])
    setCustom(false)
    setGoing(true)
}

const display = () => {
    setCount(0)
}

return(
    <div>
        <Container>
        <Header>Conway's Sequence</Header>

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
    {!going ? null :
    fullArray.map(num => 
        <Ul key={num} color={isChecked ? randomColor : `black`}>{num}</Ul>
    )} 
    {!going ? null : 
    <div>
    <Button onClick={handleClick}>Calculate Next</Button>
    </div>
    }  
    {/* {!going ? null : <Button onClick={display}>Show {count} Rows</Button>}   */}
    </Container>
    </div>
)
}

const Input = styled.input`
    width: 30vw;
    height: 5vh;
    border: none;
    border-bottom: 2px solid #7F7F7F;

    // border-bottom: 2px solid #E3E3E3;
font-size: large;
margin-bottom: 2vh;
margin-left: 1vw;
outline: none;
background-color: rgb(117, 117, 117);

&:focus {
    outline: none;
    // border-bottom: 2px solid #7F7F7F;
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

