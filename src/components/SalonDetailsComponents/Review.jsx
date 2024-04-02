import endpoint from "@/utility/axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa6";

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

  const handleStarClick = (starIndex) => {
    setStarsSelected(starIndex + 1);
  };

  const fetchReview = async (salonId) => {
    //     console.log(salonId);
    const result = await endpoint.get(`/reviews/salon/${salonId}`);
    const data = await result?.data?.reviews;

    if (!Array.isArray(data)) {
      return alert("Error on review Side");
    }
    setReviewArrays(data);
  };

  useEffect(() => {
    if (!salonId) return;
    fetchReview(salonId);
  }, [salonId]);

  return (
    <div className="mt-20 px-20 max-lg:px-2">
      <h1 className="text-center dark:text-slate-300 text-3xl font-bold max-md:text-2xl ">
        Review by our users
      </h1>

      <div>
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
        <div>
          <Textarea placeholder="Type your message here." />
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </div>

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
