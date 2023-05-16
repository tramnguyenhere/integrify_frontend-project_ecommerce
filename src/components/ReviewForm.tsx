import { useForm } from "react-hook-form";
import {v4 as uuidv4} from "uuid"

import './ReviewForm.scss';
import { Review } from "../types/Review";
import useAppDispatch from "../hooks/useAppDispatch";
import { appendReview } from "../redux/reducers/reviewReducer";

const ReviewForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Review>();
    const dispatch = useAppDispatch()

    const onSubmit = (data: Review) => {
        const newReview = {...data, id: uuidv4()}
        dispatch(appendReview(newReview))
    };

  return (
    <form className="review__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="review__form__group">
        <input
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="review__form--error">This field is required!</span>}
      </div>
      <div className="review__form__group">
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span className="review__form--error">This field is required to put a valid email!</span>}
      </div>
      <div className="review__form__group">
        <textarea
          rows={5}
          placeholder="Leave your feedback here"
          {...register("feedback", { required: true, minLength: 6 })}
        />
        {errors.feedback && <span className="review__form--error">This field is required at least 6 characters!</span>}
      </div>
      <button type="submit" className="review__form__button">
        Submit
      </button>
    </form>
  );
}

export default ReviewForm