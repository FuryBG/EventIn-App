import React from 'react'
import { NotFoundStyled } from './NotFound.styled'
import catPicture from '../../assets/Meme Cat T-shirt _ Meme Cat.jpg'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <NotFoundStyled>
        <div className='error-container'>
            <h1>Ooops!</h1>
            <h3>The page what you are looking for doesn't exist.</h3>
            <Link to={"/"}>Home</Link>
        </div>
        <div className='image-container'>
            <img src={catPicture}></img>
        </div>
    </NotFoundStyled>
  )
}
