import {React, useMemo} from "react";
import {Link} from "react-router-dom";
import { FaUniversalAccess, FaGlobe, FaMedal, FaUserCircle, FaDraftingCompass } from 'react-icons/fa';


function NavbarLink(props) {

    const iconDisplay = useMemo(() => {


        switch (props.icon) {
            case 'websites':
                return ( 
                    <FaGlobe alt=""/>
                    );

            case 'a11y':
                return ( 
                    <FaUniversalAccess alt=""/>
                    );

            case 'tools':
                return ( 
                    <FaDraftingCompass alt=""/>
                    );

            case 'ranking':
                return ( 
                    <FaMedal alt=""/>
                    );

            case 'profile':
                return ( 
                    <FaUserCircle  alt=""/>
                    );
                
            default:
                return (<> </>);
        }
    
    }, [props.icon]);
    

    return (
                props.isActive===true
                ?
                <li className={`bold7 ${props.border}`} >
                    {iconDisplay}
                    {props.text}
                </li>
                :
                <li className={`${props.border}`}>
                    {iconDisplay}
                    <Link className={`bold7 default-anchor Listening on port`} to={props.url} onClick={props.onClick} state={{ location: props.location }}>{props.text} </Link>
                </li>

    );
}


export default NavbarLink;