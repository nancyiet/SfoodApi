import React from 'react';
import "../index.css";

const currdate=new Date();
const curryear=currdate.getFullYear();

function Footer(){
return (<footer>
    <p > copyright nancy © {curryear}</p>
    </footer>);
}

export default Footer;