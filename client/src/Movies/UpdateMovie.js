import React from "react";


const initialMovie = {
    title: "",
    director: "",
    metascore: 0
    // stars: []

};

const UpdateMovie = props => {

    //Copying this but I don't get it.
    const { push } = useHistory();
    const { id } = useParams();

    const [movie, setMovie] = useState(initialMovie);

    function handleSumbit() {

    }


    return(
        <div>
            <h2>Update Movie</h2>

            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
};

export default UpdateMovie;

