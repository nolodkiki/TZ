import { useState } from 'react';
import './card.css'

import disLike from '../icons/disableLike.png'
import activeLike from '../icons/activeLike.png'
const Card = ({ like, removeCard, id, name, image, checklike }) => {


    return (
        <div className="card">
            <img className='card-image' src={image} alt="" />
            <div className="rightside">
                <div className='information'>
                    <div className='information-title'>
                        <h1>{name}</h1>
                    </div>
                    <div className='information-subtitle'>
                        <p>INFORMATION</p>
                    </div>
                </div>

                <div className="buttons">
                    {checklike 
                    ? <img onClick={() => like(id)} className='like' src={activeLike} alt="like" /> 
                    : <img onClick={() => like(id)} className='like' src={disLike} alt="like" />}

                    <button onClick={() => removeCard(id)}>Удалить</button>
                </div>
            </div>

        </div>
    )
}

export default Card