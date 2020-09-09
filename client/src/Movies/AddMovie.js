import React, {useState, useEffect, } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
     stars: [],
     id: 0

};

const AddMovie = props => {

  

    const [movie, setMovie] = useState(initialMovie);
    const [actorString, setActorString] = useState("");
    const [idCounter, setIdCounter] = useState(10);
  

    

    function changeHandler(e) {
    
        e.persist();
        //Might need to change this for array of names
        setMovie({...movie, [e.target.name]: e.target.value});
        




    };

    function actorChange(e) {
        e.persist();

        setActorString(e.target.value);
    }

    // function convertActors() {
    //     let tempString = actorString;
    //     let actorArray = tempString.split(",");
    //     console.log(actorArray);
    //     setMovie({...movie, stars: actorArray});
    // }

    //Async problems. Tried to use callback, but I'm failing to understand how this works. 
    function handleSubmit(e, callback) {

        e.preventDefault();
        console.log("submit");
        setIdCounter(idCounter +1);
        setMovie({...movie, id:idCounter});

       //Set actors based off string
       let tempString = actorString;
       let actorArray = tempString.split(",");
       console.log(actorArray);
       setMovie({...movie, stars: actorArray});

       callback(); //postFunction. This doesn't work. 
        
        
       
    };

    function postFunction() {
        console.log("Post function actors", movie.stars);
        axios
        .post("http://localhost:5000/api/movies", movie)
        .then((res => {
            console.log("Movies from post", res);
        }))
        .catch((err) => console.log(err))
    }

    

    
    //Call back example
    //The way they are all written inside each other is baffling. What would this look like if they werent'? 

    // some_3secs_function(some_value, function() {
    //     some_5secs_function(other_value, function() {
    //       some_8secs_function(third_value, function() {
    //         //All three functions have completed, in order.
    //       });
    //     });
    //   });
  

    return(
        <div>
            <h2>Add Movie</h2>

            <form onSubmit={(event) => handleSubmit(event, postFunction)} className="update-form">
               <label>
                   Title  
                   <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={movie.title}
                    />
               </label>
               <label>
                   Director  
                   <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={movie.director}
                    />
               </label>
               <label>
                   Metascore  
                   <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    value={movie.metascore}
                    />
               </label>
               <label>
                   Actors  
                   <input
                    type="text"
                    name="actors"
                    onChange={actorChange}
                    value={actorString}
                    />
               </label>
               <button>Submit</button>
            </form>
        </div>
    )
};

export default AddMovie;

