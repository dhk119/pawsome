import YouTube from "react-youtube";
const videoIds = [
  "lImOwNxIj7g",
  "wsBOq5n70CI",
  "0xvNed3G-18",
  "8ExjMW5zJ1M",
  "UQs5ogt9Ock",
  "JcXNnc3ygsU",
  "Aqft2NfDSgw",
  "f_nA9LrukVg",
  "WnRAE2s312c",
  "Fa7BoRdT-5o",
  "i5_IlDvzOyc",
  "_nQ6je0ySZQ",
  "ncyOBCvQwSg",
  "NIPrdYUdar0",
  "qwhFQYY4FWs",
  "U8QR08WPTLU",
  "53YcytMbSbg",
  "qwhFQYY4FWs",
  "92R1rQH16Ho",

  // 필요에 따라 더 많은 비디오 ID를 추가할 수 있습니다
];
const VideoList = ({ numVideos = 5 }) => {
  const getRandomVideos = (num) => {
    const shuffled = [...videoIds].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  const randomVideos = getRandomVideos(numVideos);

  const onPlayerReady = (e) => {
    e.target.stopVideo();
  };
  const opts = {
    width: "200px",
    height: "300px",
    playerVars: {
      autoplay: 1,
      loop: 1,
    },
  };
  // 비디오 ID를 섞고 지정된 개수만 선택하는 함수
  return (
    <div
      className="video-wrap"
      style={{
        marginLeft: "130px",
        backgroundColor: "#ffbe58",
        borderRadius: "15px",
      }}
    >
      {randomVideos.map((videoId) => (
        <div key={videoId}>
          <YouTube
            style={{
              margin: "50px 20px",
              backgroundColor: "#ffd697",
              width: "250px",
              height: "300px",
              textAlign: "center",
              padding: "20px 0",
              borderRadius: "15px",
            }}
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoList;
