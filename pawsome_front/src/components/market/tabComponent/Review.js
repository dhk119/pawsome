import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import DOMPurify from "dompurify";
import StarAvr from "./StarAvr";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../../utils/RecoilData";
import PageNavi from "../../utils/PageNavi";

const Review = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const productNo = params.productNo;
  const [reviewList, setReviewList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [totalCount, setTotalCount] = useState();
  const [starData, setStarData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  useEffect(() => {
    axios
      .get(`${backServer}/product/selectReviewList/${productNo}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setReviewList(res.data.list);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
        totalStar(starData);
      })
      .catch((err) => {
        console.log(err);
      });
    const totalStar = () => {
      let totalSum = 0;
      starData.forEach((item, i) => {
        let c = 5 - i;
        totalSum += item * c;
      });
      setTotal(totalSum);
    };
  }, []);
  console.log("평점 : ", total / 5);

  return (
    <div className="reviewTotal-wrap">
      <div className="star-wrap">
        <div className="star-wrap-title">
          <div className="total_star">{total / 5}</div>
          <Rating
            name="half-rating-read"
            defaultValue={total / 5}
            precision={0.1}
            readOnly
          />
        </div>
        <StarAvr starData={starData} setStarData={setStarData} />
      </div>
      <div className="review-list">
        {reviewList.map((review, i) => {
          return <ReviewItem key={"review-" + i} review={review} />;
        })}
      </div>
      <div className="pagenavi">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};

const ReviewItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const review = props.review;
  const value = review.reviewStar;
  const [reviewFile, setReviewFile] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/product/selectOneReviewFile/${review.reviewNo}`)
      .then((res) => {
        console.log(res);
        setReviewFile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="review-detail">
      <div className="review-title">
        <div>
          <div className="writer">{review.reviewWriter}</div>
          <div className="star">
            <Rating name="read-only" value={value} readOnly />
          </div>
        </div>
        <div className="date">{review.reviewRegDate}</div>
      </div>
      <div className="review-content">
        {reviewFile != "" ? (
          <>
            <>
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="img-wrap"
              >
                {reviewFile
                  ? reviewFile.map((image, i) => {
                      return (
                        <SwiperSlide>
                          <img
                            key={("img-", i)}
                            src={`${backServer}/review/thumb/${image.reviewFileStorage}`}
                          />
                        </SwiperSlide>
                      );
                    })
                  : ""}
              </Swiper>
            </>
            <div className="text-wrap review-style">
              {review.reviewContent && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(review.reviewContent)),
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-wrap">
            {review.reviewContent && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(review.reviewContent)),
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
