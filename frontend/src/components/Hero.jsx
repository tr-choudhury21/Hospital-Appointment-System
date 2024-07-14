import React from 'react'

const Hero = ({title, imageUrl}) => {
    return (
        <div className='hero container'>
            <div className="banner">
                <h1>{title}</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet hic itaque quia voluptates at fugiat, tempore vel laudantium tenetur. Eaque rem magnam ipsum!
                </p>
            </div>
            <div className="banner">
                <img src={imageUrl} alt="hero" className="animated-image"/>
                <span>
                    <img src="/Vector.png" alt="vector" />
                </span>
            </div>
        </div>
    )
}

export default Hero