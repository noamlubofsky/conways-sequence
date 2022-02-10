import React, { useState } from "react";
import styled from "styled-components";
import randomColor from "randomcolor";

function NumberString({num}) {
    return(
        `${num.length}` + `${num[0]}`
    )
}

export default NumberString