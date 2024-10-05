import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const labels = {
  0: "별을 클릭해주세요",
  1: "나빠요",
  2: "별로예요",
  3: "보통이에요",
  4: "좋아요",
  5: "최고예요",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const Star = (props) => {
  const value = props.value;
  const setValue = props.setValue;
  const [hover, setHover] = useState(-1);

  return (
    <Box sx={{ width: 340, display: "flex", alignItems: "center" }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        size="large"
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
};

export default Star;
