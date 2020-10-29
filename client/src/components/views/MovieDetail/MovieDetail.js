import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY} from '../../../Config' 
import MainImage from '../LandingPage/Sections/MainImage'
import {IMAGE_BASE_URL} from '../../../Config'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import {Grid} from '@material-ui/core'
import man from '../../../image/man.jpg'

const MovieDetail = (props) => {
    let movieId = props.match.params.movieId

    const [movieInfo, setMovieInfo] = useState([])
    const [castInfo, setCastInfo] = useState([])
    const [actorToggle, setActorToggle] = useState(false)

    useEffect(()=>{
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovieInfo(response)
            })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCastInfo(response.cast)
            console.log(castInfo)
        })
    },[])

    const actorToggleHandler = () => {
        setActorToggle(!actorToggle)
    }

    return (
        <div>
            {/* header */}
            {movieInfo.backdrop_path &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${movieInfo.backdrop_path}`}
                    title={movieInfo.original_title}
                    text={movieInfo.overview}
                />
            }       
            {/* body */}
            <div style={{width:'85%', margin: '1rem auto'}}>
                {/* movieInfo */}
                <MovieInfo movie={movieInfo}/>
                <br/>

                {actorToggle &&
                <Grid container spacing={1}>
                    {castInfo && castInfo.map((cast, index)=>(
                        <React.Fragment key={index}>
                            <GridCards 
                                image={cast.profile_path ? 
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}`: null}
                                actorName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                    
                </Grid>
                }
                <div style={{display:'flex', justifyContent:'center', margin: '2rem'}}>
                    <button onClick={actorToggleHandler}> Toggle Actor View</button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
