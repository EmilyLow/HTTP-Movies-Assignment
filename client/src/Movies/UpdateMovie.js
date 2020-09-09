import React, {useState, useEffect, } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: ""
    // stars: []

};

const UpdateMovie = props => {

    //Still a bit confused by this. Are the brackets just a way to indicate destructuring? But once its been declared it can be used like any other variable? 
    const { push } = useHistory();
    const { id } = useParams();

    const [movie, setMovie] = useState(initialMovie);

  

    //I'm not sure I understand the point of this. Is it to set initial field values to equal the one you're editing? It works if I directly change url, but not if I click on a link. 
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            // console.log("Test test test");
            // console.log("Update use effect", res.data);
            setMovie(res.data);
            // console.log("Movie", movie);
        })
        .catch((err) => console.log(err));
    }, [id]);

    function changeHandler(e) {
        //From example, this doesn't seem to be striclty necessary. Best practice?
        e.persist();

        //Why does the key need to be wrapped in an array again? I need to figure out some reference for understanding all of the different uses of [] and {} and () since they vary confusingly. 
        setMovie({...movie, [e.target.name]: e.target.value});

    };

    //This works but you have to refresh home. How to fix that? 
    function handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                setMovie(res.data)
                console.log("put data", res.data);
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err));
    };


    return(
        <div>
            <h2>Update Movie</h2>

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

export default UpdateMovie;

