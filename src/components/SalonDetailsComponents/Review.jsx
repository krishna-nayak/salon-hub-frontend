import endpoint from "@/utility/axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const ANONYMOUS =
  "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
const StarFunc = ({ selected = false, onClick = (f) => f }) => (
  <FaStar
    color={selected ? "yellow" : "gray"}
    onClick={onClick}
    className="inline-block"
  />
);

const Review = ({ salonId }) => {
  const totalStars = 5;
  const [starsSelected, setStarsSelected] = useState(0);
  const [reviewArrays, setReviewArrays] = useState([]);

  const { register, handleSubmit, setValue } = useForm();

  const handleStarClick = (starIndex) => {
    setStarsSelected(starIndex + 1);
  };

  const fetchReview = async (salonId) => {
    //     console.log(salonId);
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = "null";
    }

    const [result_array_review, result_current_user_review] = await Promise.all(
      [
        endpoint.get(`/reviews/salon/${salonId}`),
        endpoint.get(`/reviews/${salonId}/${userId}`),
      ]
    );

    const reviewArrData = await result_array_review?.data?.reviews;
    const userReview = await result_current_user_review?.data;
    //     const userReview = await result_current_user_review?.data?.user;
    console.log(reviewArrData);
    console.log(userReview);

    if (!Array.isArray(reviewArrData)) {
      return alert("Error on review Side");
    }

    if (userReview?.id) {
      setStarsSelected(userReview.rating);
      setValue("comment", userReview.comment);
      // console.log("Setting");
    }
    const filterReview = reviewArrData?.filter(
      (review) => review?.userId !== userId
    );

    setReviewArrays(filterReview);
  };

  useEffect(() => {
    if (!salonId) return;
    fetchReview(salonId);
  }, [salonId]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("Please Login");
      await endpoint.post(`/reviews/${salonId}/${userId}`, {
        comment: data.comment,
        rating: starsSelected,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-20 px-20 max-lg:px-2">
      <h1 className="text-center dark:text-slate-300 text-3xl font-bold max-md:text-2xl ">
        Review by our users
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 my-2">
        <div className="flex gap-3">
          <img
            src={localStorage.getItem("imageUrl") || ANONYMOUS}
            alt=""
            width={50}
          />
          <div>
            {[...Array(totalStars)].map((n, i) => (
              <StarFunc
                key={i}
                selected={i < starsSelected}
                onClick={() => handleStarClick(i)}
              />
            ))}
            <p>
              {starsSelected} of {totalStars} stars
            </p>
          </div>
        </div>
        <div>
          <Textarea
            placeholder="Type your message here."
            {...register("comment")}
          />
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </form>

      {/* Review Box */}
      <div>
        {reviewArrays.length !== 0
          ? reviewArrays?.map((review) => (
              <div key={review?.id}>
                <div className="flex gap-2">
                  <img
                    src={review?.User?.imageUrl}
                    alt={review?.User?.fullName}
                    width={50}
                  />

                  <div className="flex flex-col">
                    <div>{review?.User?.fullName}</div>
                    {/* rating */}
                    <div>
                      {[...Array(totalStars)].map((n, i) => (
                        <StarFunc key={i} selected={i < review?.rating} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* comment */}
                <div>{review?.comment}</div>
              </div>
            ))
          : "NO REVIEW"}
      </div>
    </div>
  );
};

export default Review;
