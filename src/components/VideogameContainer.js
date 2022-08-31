import styled from "styled-components";
import {VideogameCard} from "./VideogameCard";

const StyledVideogameContainer = styled.div`
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  align-self: flex-end;
  //justify-content: flex-end;
`

export const VideogameContainer = ({videogames}) => {

    return (
        <StyledVideogameContainer>
            {videogames.map(game => {
                return (
                    <VideogameCard
                        id={game.id}
                        name={game.name}
                        image={game.background_image}
                        genres={game.genres}
                        rating={game.rating}
                        redditDescription={game.reddit_description}
                    >
                    </VideogameCard>
                )
            })}
        </StyledVideogameContainer>
    )
}
