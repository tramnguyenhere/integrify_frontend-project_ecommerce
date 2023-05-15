import React from 'react'

const ReviewForm = () => {
    const submitHandler = () => {
  
    };
  return (
    <form className='review__form' onSubmit={submitHandler}>
                    <div className='form__group'>
                      <input
                        type='text'
                        placeholder='Enter your name'
                        required
                      />
                    </div>
                    <div className='form__group'>
                      <input
                        type='text'
                        placeholder='Enter your email'
                        required
                      />
                    </div>
                    <div className='form__group'>
                      <textarea
                        rows={5}
                        placeholder='Leave your feedback here'
                        required
                      />
                    </div>
                    <button type='submit' className='addToCart__btn'>
                      Submit
                    </button>
                  </form>  
  )
}

export default ReviewForm