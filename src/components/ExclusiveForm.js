import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Input} from "./elements/Input";
import {cleanError, createVideogame} from "../redux/actions";
import {Redirect} from "react-router-dom";

const StyleForm = styled.div`
  display: flex;
  min-width: 1100px;
  min-height: 100vh;
  border-right: solid 2px black;
  border-left: solid 2px black;
  align-self: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
  }
  
  select{
    width: 60%;
    height: 40px;
    font-family: "JetBrainsMono Nerd Font Mono";
    font-weight: 700;
    font-size: medium;
    margin-top: 30px;
    //margin-bottom: 30px;
  }
  
  .selectedItem{
    display: flex;
    width: 200px;
    margin-top: 10px;
    justify-content: space-between;
    
    button{
      height: 20px;
      align-self: center;
      justify-self: center;
      border-radius: 3px;
      color: white;
      background-color: black;
      border: solid 2px black;
      
      :hover{
        cursor: pointer;
      }
      
    }
  }
  
  .submit{
    height: 40px;
    width: 30%;
    align-self: center;
    margin-top: 40px;
    margin-bottom: 300px;
    font-size: large;
    font-weight: bold;
    color: white;
    background-color: black;
    border-radius: 5px;
    border: solid 3px black;
    
    :hover{
      cursor: pointer;
    }
  }

  h3 {
    margin-top: 20%;
  }
  
  .errordb{
    color: orangered;
    font-weight: bold;
    font-size: large;
    text-align: center;
    margin-top: 40px;
  }
`


///TODO: validation

export const ExclusiveForm = (props) => {

    const dispatch = useDispatch()

    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    const game = useSelector(state => state.videogameDetail)
    const error = useSelector(state => state.error)
    const state = useSelector(state => state)


    const [name, setName] = useState({value: '', valid: null})
    const [description, setDescription] = useState({value: '', valid: null})
    let [date, setDate] = useState({value: new Date('1900-1-1'), valid: null})
    const [rating, setRating] = useState({value: 0, valid: null})
    const [image, setImage] = useState({value: '', valid: null})
    let [platformsForm, setPlatfors] = useState([])
    let [genresForm, setGenres] = useState([])

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        dispatch(cleanError())

        if (
            name.valid === 'true' &&
            description.valid === 'true' &&
            date.valid === 'true' &&
            rating.valid === 'true'
        ){
            await dispatch(createVideogame({
                name,
                description,
                date,
                rating,
                image,
                platformsForm,
                genresForm
            }))
        }



        console.log(
            name,
            description,
            date,
            rating,
            image,
            platformsForm,
            genresForm)

    }

    const handleDate = async event => {
        date.value = await new Date(event.target.value.split('-'))

        setDate({
            ...date,
            value: await new Date(event.target.value.split('-')),
        })
    }

    const handleOption = (ev) => {
        ev.preventDefault()
        const value = ev.target.parentNode.querySelector('p').innerText
        if (ev.target.parentNode.parentNode.className === 'selectedGenres') {
            const newGen = genresForm.filter(elem => elem !== value)
            genresForm = newGen
        }
        if (ev.target.parentNode.parentNode.className === 'selectedPlatforms') {
            const newPlat = platformsForm.filter(elem => elem !== value)
            platformsForm = newPlat
        }
        console.log(platformsForm)
        ev.target.parentNode.remove()
    }

    const handleSelect = (ev) => {
        const value = ev.target.children[ev.target.selectedIndex].value

        const genreContainer = document.createElement('div')
        const genreTitle = document.createElement('p')
        const deleteGenreButton = document.createElement('button')
        genreContainer.setAttribute('value', value)
        genreContainer.setAttribute('name', value)
        genreContainer.setAttribute('class', 'selectedItem')
        deleteGenreButton.onclick = (ev) => handleOption(ev)
        genreTitle.innerText = value
        deleteGenreButton.innerText = 'X'
        genreContainer.append(genreTitle, deleteGenreButton)

        if (ev.target.name === 'genresSelect') {
            document.getElementsByClassName('selectedGenres')[0].appendChild(genreContainer)
            genresForm.push(value)
        }
        if (ev.target.name === 'platformsSelect') {
            const selectedGenresContainer = document.getElementsByClassName('selectedPlatforms')[0]
            document.getElementsByClassName('selectedPlatforms')[0].appendChild(genreContainer)
            platformsForm.push(value)
        }

    }


    return <>
        {genres.genres && platforms.length > 0 ?
            <StyleForm>


                <form onSubmit={handleSubmit}>

                    <h1>Create your own N1CE !</h1>


                    <Input
                        type={'text'}
                        name={'Name'}
                        placeholder={'Game name...'}
                        value={name.value}
                        onChange={event => setName({
                            ...name,
                            value: event.target.value
                        })}
                        regex={name.value.length >= 4 ? 1 : 2}
                        state={name}
                        setState={setName}
                        error={'Game name must have 4 chars at least'}
                    />
                    <Input
                        type={'textarea'}
                        name={'Description'}
                        onChange={event => setDescription({
                            ...description,
                            value: event.target.value
                        })}
                        placeholder={'Little description right here...'}
                        value={description.value}
                        state={description}
                        setState={setDescription}
                        regex={description.value.split(" ").length > 9 ? 1 : 2}
                        error={'Description must have almost 10 words'}
                    />

                    <Input
                        type={'date'}
                        placeholder={'release date'}
                        value={date.value}
                        onChange={handleDate}
                        name={'Release date'}
                        regex={date.value.getFullYear() > 1900 ? 1 : 2}
                        state={date}
                        setState={setDate}
                        error={'Insert valid date'}
                    />

                    <Input
                        type={'number'}
                        placeholder={"Value between 1/5..."}
                        value={rating.value}
                        onChange={event => setRating({
                            ...rating,
                            value: event.target.value
                        })}
                        name={'Rating'}
                        min={1}
                        max={5}
                        regex={rating.value >= 1 && rating.value <= 5 ? 1 : 2}
                        state={rating}
                        setState={setRating}
                        error={'Rating value must be between 1/5'}
                    />

                    <Input
                        type="text"
                        onChange={event => setImage(event.target.value)}
                        placeholder={'image-example.com...'}
                        name={'Image URL'}
                        regex={1}
                        value={image}
                        state={image}
                        setState={setImage}
                    />

                    <div className={'platformsSelect'}>
                        <select onChange={(event) => handleSelect(event)} name="platformsSelect" id="">
                            <option value>Select platforms...</option>
                            {platforms.map(elem => <option value={elem.name}>{elem.name}</option>)}
                        </select>
                    </div>
                    <div className={'selectedPlatforms'}>
                    </div>
                    <select onChange={event => handleSelect(event)} name="genresSelect" id="">
                        <option value="">Select Genres...</option>
                        {genres.genres.map(elem => <option value={elem.name}>{elem.name}</option>)}
                    </select>
                    <div className={'selectedGenres'}>

                    </div>
                    {error ? <p className={'errordb'}>{error}</p> : ''}
                    <button className={'submit'}>submit</button>
                </form>
                {game.id ? <Redirect to={`/videogames/${game.id}?justCreated=true`}/> : ''}
            </StyleForm>
            : <StyleForm>
                <h3>loading...</h3>
            </StyleForm>
        }
    </>
}


