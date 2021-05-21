import React from 'react';
import './Header.css';
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from './firebase';

function Header() {

    const [ {basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className='header'>

            <Link to="/">
                <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""/>
            </Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" /> 
            </div>

            <div className="header__nav">
            <Link to={!user && "/Login"}>
                <div onClick={handleAuthentication} className="header__option">
                    <span className="header__optionLineOne">
                         {user ?  'Hello ' + user?.email.charAt(0).toUpperCase()  + user?.email.slice(1).split("@")[0]:  'Hello Guest'} 
                    </span> 
                    <span className="header__optionLineTwo">
                       {user ?  'Sign Out' :  'Sign In'} 
                    </span> 
                </div> 
                </Link>
            </div>

            <div className="header__nav">
                <Link to='/orders/'>
                   <div className="header__option">
                        <span className="header__optionLineOne">
                            Returns
                        </span>
                        <span className="header__optionLineTwo">
                            & Orders
                        </span>
                    </div> 
                </Link>
            </div>

            <div className="header__nav">
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span> 
                </div> 
            </div>

            <Link to="/Checkout">
            <div className="header__optionBasket"> 
                <ShoppingBasketIcon /> 
                <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
            </div>
            </Link>


        </div>
    )
}

export default Header