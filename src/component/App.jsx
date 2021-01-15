import React from "react";
import Foody from "./Foody";
import Footer from "./Footer";
//import {createStore} from "redux";
//import {Provider} from "react-redux";
//import FetchDataReducer from "../reducers/FetchDataReducer";

 //const store=createStore(FetchDataReducer );
function App()
{

    return(
        <div>
      <Foody/>
        <Footer/>
        </div>
        
    );
}
export default App;