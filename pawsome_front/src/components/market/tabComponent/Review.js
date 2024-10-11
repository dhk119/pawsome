import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import DOMPurify from "dompurify";
import StarAvr from "./StarAvr";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginEmailState } from "../../utils/RecoilData";
import PageNavi from "../../utils/PageNavi";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

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
  const [starTotalCount, setStarTotalCount] = useState(0);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  useEffect(() => {
    axios
      .get(`${backServer}/product/selectReviewList/${productNo}/${reqPage}`)
      .then((res) => {
        setReviewList(res.data.list);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  const averageRating =
    starTotalCount > 0 ? Math.ceil((total / starTotalCount) * 10) / 10 : 0;

  console.log("Average Rating:", averageRating); // 값 확인
  console.log(reviewList);
  return (
    <div className="reviewTotal-wrap">
      {reviewList != "" ? (
        <>
          <div className="star-wrap">
            <div className="star-wrap-title">
              <div className="total_star">{averageRating}</div>
              <Rating
                name="half-rating-read"
                value={averageRating}
                precision={0.1}
                readOnly
              />
            </div>
            <StarAvr
              starData={starData}
              setStarData={setStarData}
              total={total}
              setTotal={setTotal}
              starTotalCount={starTotalCount}
              setStarTotalCount={setStarTotalCount}
            />
          </div>
          <div className="review-list">
            {reviewList.map((review, i) => {
              return <ReviewItem key={"review-" + i} review={review} />;
            })}
          </div>
          <div className="pagenavi">
            <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
          </div>
        </>
      ) : (
        <div className="preview-reply">
          <div>
            <img src="/image/noreplyimg.png" />
          </div>
          <div>
            <span style={{ color: "#ccc", fontWeight: "bold" }}>
              아직 리뷰가 없어요!
            </span>
          </div>
          <div>
            <span style={{ color: "#ccc" }}>첫 리뷰를 작성해주세요</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const review = props.review;
  const value = review.reviewStar;
  const [reviewFile, setReviewFile] = useState([]);
  const labels = {
    1: "나빠요",
    2: "별로예요",
    3: "보통이에요",
    4: "좋아요",
    5: "최고예요",
  };
  const getLabelText = (value) => {
    return `${labels[value]}`;
  };
  useEffect(() => {
    axios
      .get(`${backServer}/product/selectOneReviewFile/${review.reviewNo}`)
      .then((res) => {
        // console.log(res);
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
            <Box sx={{ width: 300, display: "flex", alignItems: "center" }}>
              <Rating
                name="half-rating-read"
                value={value}
                precision={1}
                getLabelText={getLabelText}
                readOnly
              />
              <span style={{ marginLeft: 8 }}>{getLabelText(value)}</span>
            </Box>
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
