import endpoint from "@/utility/axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { formatDistanceToNow } from "date-fns";
const ANONYMOUS =
  "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
const StarFunc = ({ selected = false, onClick = (f) => f }) => (
  <FaStar
    color={selected ? "yellow" : "gray"}
    onClick={onClick}
    className="inline-block"
    size={20}
  />
);

import { Card, CardContent } from "@/components/ui/card";

const Review = ({ salonId }) => {
  const totalStars = 5;
  const [starsSelected, setStarsSelected] = useState(0);
  const [reviewArrays, setReviewArrays] = useState([]);
  const [starsRatingCounts, setStarsRatingCounts] = useState(
    Array(totalStars).fill(0)
  );

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
    // console.log(reviewArrData);
    // console.log(userReview);

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
    // const filterReview = reviewArrData;
    setReviewArrays(reviewArrData);

    // console.log("filterReview", filterReview);
    // Calculate counts of ratings for each star
    const counts = Array(totalStars).fill(0);
    // console.log("filtered ratings", filterReview);
    reviewArrData.forEach((review) => {
      counts[review.rating - 1]++;
    });
    setStarsRatingCounts(counts);
    console.log(counts);
  };

  useEffect(() => {
    if (!salonId) return;
    fetchReview(salonId);
  }, [salonId]);

  const onSubmit = async (data) => {
    // console.log(data);
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
    <div>
      <h1 className="text-center  dark:text-slate-300 text-3xl font-bold max-md:text-2xl mt-20 ">
        Review by our customers
      </h1>
      <p className="text-yellow-500 text-md text-center mt-2 px-6">
        Please give your review, your feedback matters !{" "}
      </p>

      <div className="flex flex-wrap justify-center gap-24  max-md:gap-10  mt-20">
        <div>
          <Carousel
            infiniteLoop
            autoPlay
            showIndicators={false}
            interval={5000}
            stopOnHover={true}
            className="bg-white border rounded-2xl shade w-96 h-64  max-sm:w-80 "
          >
            {reviewArrays.length !== 0 ? (
              reviewArrays.map((review, index) => (
                <div key={review?.id}>
                  <div>
                    <div className="flex items-center justify-center py-8  ">
                      <div className="flex text-start gap-4 ">
                        <img
                          src={review?.User?.imageUrl}
                          alt={review?.User?.fullName}
                          className="carouselavtar"
                        />
                        <div className="flex flex-col ">
                          <div className=" text-base font-semibold text-gray-400">
                            {review?.User?.fullName}
                          </div>
                          <div>
                            {[...Array(totalStars)].map((_, i) => (
                              <StarFunc key={i} selected={i < review?.rating} />
                            ))}
                          </div>
                          <p className="text-sm  mt-1 text-blue-500">
                            {formatDistanceToNow(new Date(review?.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center px-2 mt-2 text-base   ">
                      <span className="text-gray-500 text-lg">❝</span>{" "}
                      {review?.comment}
                      <span className="text-gray-500 text-lg"> ❞</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No reviews</div>
            )}
          </Carousel>
        </div>
        <div>
          {[...Array(totalStars)].map((_, i) => (
            <div key={i}>
              <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">
                {i + 1} star
              </div>
              <div className="w-72 bg-gray-200 rounded-full h-2.5 mb-4  dark:bg-gray-700">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{
                    width: `${
                      reviewArrays.length != 0
                        ? (starsRatingCounts[i] / reviewArrays.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 my-2">
          <div className="flex justify-between">
            <div>
              <p className="">Rate your experience</p>
              <div className="flex gap-2 mt-2 ">
                {[...Array(totalStars)].map((n, i) => (
                  <StarFunc
                    key={i}
                    selected={i < starsSelected}
                    onClick={() => handleStarClick(i)}
                  />
                ))}
                <p className="font-semibold text-gray-500">
                  {starsSelected} of {totalStars} stars
                </p>
              </div>
            </div>
            <img
              src={localStorage.getItem("imageUrl") || ANONYMOUS}
              alt=""
              width={60}
            />
          </div>
          <div className="w-80">
            <p>Describe your experience</p>
            <Textarea
              placeholder="Type your message here."
              {...register("comment")}
              className="mt-2"
            />
          </div>
          <div>
            <Button
              className="w-full mt-4 border-yellow-400 text-yellow-400"
              variant="outline"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
