import {Link} from "react-router-dom";
import React from "react";

const Navbar = (props) => {
    return (
        <nav>
                {(props.userId==='')&&(<ul><li>
                    <Link to="/login">Login</Link>
                </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>)}
        </nav>
    );
};
export default Navbar;
