import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we Are</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nesciunt inventore, consectetur aut illo temporibus, eum aliquam cumque neque similique, consequuntur expedita? A nemo commodi, necessitatibus eos, dolorum iste aut dolores delectus ad reprehenderit velit eius non. Earum voluptatem perferendis molestiae hic reiciendis? Veniam quibusdam id voluptatum sed. Perferendis, reprehenderit.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate officia ex mollitia animi quos nihil saepe. Optio nemo corporis, ea possimus quasi aliquid praesentium magni.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, vel!</p>
      </div>
    </div>
  )
}

export default Biography
