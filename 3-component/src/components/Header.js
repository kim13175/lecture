import React from "react";

/* 프롭스를 이용하여 재사용성을 높일 수 있음 */
const Header = (props) => {
    return (
        <header>
           <h2 className="container">{props.title}</h2> 
        </header>
    )
}

export default Header;