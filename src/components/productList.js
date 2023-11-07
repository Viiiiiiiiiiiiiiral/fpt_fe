import React, {useState, useEffect} from "react";
import {Table} from "react-bootstrap";
import axios from 'axios';
import Item from "./item";

function ProductList() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [order, setOrder] = useState();
    
    const getProduct = () => {
        return axios.get("http://localhost:3001/products")
            .then((d) => setData(d.data))
    }
    useEffect(() => {
        getProduct()
    },[])
    useEffect(()=>{
        console.log("render")
    },[cart])

    const handleChange = (productCode, d) => {
        const newItem = data.find((v) => v.ID === productCode);
        console.log("===============newItem")
        console.log(newItem)
        console.log(cart)
        const checkItemIndex = cart.findIndex((v) => v.ID === newItem.ID);
        console.log("===============checkItemIndex")
        console.log(checkItemIndex)
        if (checkItemIndex < 0) {
            setCart([...cart, {...newItem, quantity: 1}])
            setTotalPrice(prev=> (Number(prev) + Number(newItem.Price.split('$')[1])).toFixed(2))
        } else {
            const firstHalf = cart.slice(0,checkItemIndex)
            console.log("===============firstHalf")
            console.log(firstHalf)
            const secondHalf = cart.slice(checkItemIndex+1)
            console.log("===============secondHalf")
            console.log(secondHalf)
            let itemObj = cart.slice(checkItemIndex , checkItemIndex + 1)[0]
            console.log("===============itemObj")
            console.log(itemObj)
            
            //itemObj ={...itemObj,quantity: itemObj.quantity + d}
            itemObj.quantity = d === 1 ? itemObj.quantity + 1 : itemObj.quantity - 1
            let newCart = [...firstHalf, itemObj, ...secondHalf]
            newCart = newCart.filter((item) => item.quantity > 0)
            setCart(newCart)
            if (d===1) {
                setTotalPrice(prev=> (Number(prev) + Number(itemObj.Price.split('$')[1])).toFixed(2))
            } else {
                setTotalPrice(prev=> (Number(prev) - Number(itemObj.Price.split('$')[1])).toFixed(2))
            }
            
        }
    };

    const createOrder = () => {
        return axios({
            method: 'post',
            url: "http://localhost:3001/orders",
            headers: {},
            data: {
                product: cart
            }
        }).then((d) => alert(`Order success!`))
    }

    console.log(cart)
    return(
        <div className="col-sm-16 offset-sm-3">
            <h1>Product</h1>
            <Table>
                <tr className="col-sm-8">
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                </tr>
                {
                    data.map((item) => 
                    <Item
                    ID={item.ID}
                    Name={item.Name}
                    Price={item.Price}
                    isShowMinus={false}
                    handleChange = {handleChange}
                    />
                    
                    )
                }
            </Table>
            <h1>Cart</h1>
            <Table>
                <tr className="col-sm-8">
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                </tr>
                {
                    cart.map((item, index) => 
                        <Item
                        ID={item.ID}
                        Name={item.Name}
                        Price={item.Price}
                        Quantity = {item.quantity}
                        handleChange = {handleChange}/>
                    )
                }
                <tr className="col-sm-8">
                    <td>totalPrice</td>
                    <td>{totalPrice}</td>
                </tr>
                <tr className="col-sm-8">
                <button onClick={() => createOrder()}>Create Order</button>
                </tr>
            </Table>
        </div>
    )
}
export default ProductList;