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

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        setIdCounter(idCounter +1);
        setMovie({...movie, id:idCounter});
        
        axios
        .post("http://localhost:5000/api/movies", movie)
        .then((res => {
            console.log("Movies from post", res);
        }))
        .catch((err) => console.log(err))
    };


    return(
        <div>
            <h2>Add Movie</h2>

            <form onSubmit={handleSubmit} className="update-form">
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
               <button>Submit</button>
            </form>
        </div>
    )
};

export default AddMovie;

