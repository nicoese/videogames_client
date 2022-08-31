import styled from "styled-components";
import {Link} from "react-router-dom";

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 225px;
  min-width: 225px;
  min-height: 410px;
  background-color: cornsilk;
  filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2));

  
  a{
    display: block;
    overflow: auto;
    text-decoration: none;
    color: saddlebrown;
    text-align: center;
    margin-top: 0px;
  }
  
  &:hover {
    filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.8));
    cursor: pointer;
    //border: solid 3px black;
  }
`

const ImageGameCard = styled.div`

  display: flex;
  width: 100%;
  height: 70%;
  overflow: hidden;

  background-image: url("${({image}) => image}");
  background-size: cover;
  background-position: center;
  //border-bottom: solid 3px black;
`

const GameCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin: 5px;
  font-weight: 700;
  font-size: .9rem;

  p {
    margin-bottom: 6px;
    margin-top: 0px;
  }
  
`

export const VideogameCard = ({id, name, image, genres, rating, redditDescription}) => {

    return (

        // <Link to={`/videogames/${id}`} style={{
        //     display: "inline-block",
        //     overflow: "auto"
        // }}>
                <GameCard>
                <ImageGameCard image={image} alt={redditDescription}/>
                <GameCardContent>
                    <p>{name}</p>
                    <p>{genres.map(({name}) => {
                        if (genres[genres.length - 1].name === name) return `${name.toUpperCase()}.`
                        return name.toUpperCase() + ', '
                    })}</p>
                    <p>rawg Rating: {rating}/5</p>
                </GameCardContent>
                    <Link to={`/videogames/${id}`}>More>>></Link>
            </GameCard>
        // {/*</Link>*/}



    )
}
