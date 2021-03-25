import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { Switch} from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import {Route} from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import React from "react";

function App() {
    return (
        <div>
            <Navbar/>
                <Switch>
                    <Route exact={true} path={'/'} component={ProductList} exact/>

                    <Route path={'/product/:id?/:name?'} component={ProductDetails}/>
                </Switch>
        </div>
    );
}

export default App;
