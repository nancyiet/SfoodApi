import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import "../index.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
   
 
const useDataApi = (initialUrl, initialData) => {
 
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
 
         
  

  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
     
      try {
       
       const response = await axios(url);
        const food=await response.data;
        setData(food.results);
       
        }
      catch (error) {
        setIsError(true);
        console.log(error);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return [{ data, isLoading, isError }, setUrl];
};



 
function Foody() {
  
  const [query, setQuery] = useState("");
  const [includeIngredient,setIin]=useState("");
  const api=process.env.REACT_APP_API_KEY;
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey="+api+"&addRecipeInformation=true&includeIngredients=salt,sugar",
     [] ,
  );

  

  const [isExpanded, setExpanded] = useState(false);
  function expand() {
    setExpanded(!isExpanded);
  }
  
  function showRecipe(url)
  {
    window.location.href=url;
  }
  
  function scrollTOId()
  {
     document.getElementById('refId').scrollIntoView({
       behavior:"smooth",
     });
     
  }
  
  return (
   
    <Fragment>
      <nav >
      <form
        onSubmit={event => {
          query!="" &&

          doFetch(
            'https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey='+api+'&addRecipeInformation=true&query='+query ,
          )
          query!=""&&scrollTOId();
         
          event.preventDefault();
        
        }}
      >
        {isExpanded===false &&
               (<div className="container"> 
               <div className="foodyish">Foodyish <FastfoodIcon/></div>
               <div className="outer">
              <input 
                type="text"
                name="query"
                onChange={event => {setQuery(event.target.value);
                   event.preventDefault();
                   }}
                value={query}
                autoComplete="off"
                autoCorrect="on"
                 placeholder="search a million recipes & more" />
                <button className="search-button" type="submit"><SearchIcon/></button>
                <div className="inner"
                 id="ingredient search" 
                 onClick={expand}>ingredient search</div>
               </div>
                </div>)} 
                 </form>
 
               { isExpanded && 
              ( <form  onSubmit={event => {
                includeIngredient!="" &&
                doFetch(
                  'https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey='+api+'&addRecipeInformation=true&includeIngredients='+includeIngredient ,
                );
                includeIngredient!="" &&scrollTOId();
                event.preventDefault();
              }}> <div className="container">
                   <div className="foodyish">Foodyish <FastfoodIcon/></div>
              <div className="outer">
               <input 
               type="text" 
               onChange={event=>setIin(event.target.value)} 
               name="includeIngredient" 
               value={includeIngredient} 
               autoComplete="off" 
               autoCorrect="on"
               placeholder="Include Ingredients seperated by comma"/>
              <button className="search-button" type="submit"><SearchIcon/></button>
              <div className="inner" 
              id="keyword search" 
              onClick={expand}>keyword search</div>
         </div>
         </div>
         </form>  ) }
          </nav>
        
       
     {isError &&  <Alert severity="error">Something went wrong...!</Alert>}

      {isLoading ? 
   <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>:
   (
      <div className="outerRoot" id="refId">
           { data.map((item,index) => (
             <Card className="innerRoot" key={index} >

            <div onClick={()=>showRecipe(item.sourceUrl)}>
            
             <CardHeader
               title={item.title}
               subheader={ "By"+" "+item.sourceName}
             />
             
             <CardMedia
               className="media"
               image= {item.image} 
               title={item.title}
              
             />
              
             <CardContent>
               <Typography variant="body2" color="textSecondary" component="p">
                readyInMinutes: {item.readyInMinutes}
               <br/> servings: {item.servings}
               </Typography>
               < FavoriteIcon className="favourite"  />
             </CardContent>
            
             </div>
           </Card>
     
       ))}
       </div>
       )}
   
      
    </Fragment>
  );
}
 
export default Foody;