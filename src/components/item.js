import React, {useState, useEffect} from "react";


function Item({ID, Name, Price, Quantity, handleChange, isShowMinus=true}) {

    const [quantity, setQuantity] = useState();
    // const handleChange = () => {
    //     setQuantity((prev) => {prev++})
    // }
    console.log(typeof handleChange)
    return (
        <tr>
            <td>{ID}</td>
            <td>{Name}</td>
            <td>{Price}</td>
            {
                Quantity && <td>{Quantity}</td>
            }
            <button onClick={() => handleChange(ID, 1)}>+</button>
            {isShowMinus && <button onClick={() => handleChange(ID, -1)}>-</button>}
        </tr>
    )
}
export default Item;