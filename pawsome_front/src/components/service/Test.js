const Test = () => {
  var xhr = new XMLHttpRequest();
  var url = "http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo"; /*URL*/
  var queryParams =
    "?" +
    encodeURIComponent("serviceKey") +
    "=" +
    "jsZCz0OGXZhMZy5zCGJsDuwg8TF0k1DPK%2Bzxhu8gR36oqJz8qsxSNCI2XDcTuh8h%2BPxtDX5PtG2dVCIcFjZC0g%3D%3D"; /*Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("dog_reg_no") +
    "=" +
    encodeURIComponent("410000001513331"); /**/
  queryParams +=
    "&" + encodeURIComponent("rfid_cd") + "=" + encodeURIComponent(""); /**/
  queryParams +=
    "&" +
    encodeURIComponent("owner_nm") +
    "=" +
    encodeURIComponent("홍길동"); /**/
  queryParams +=
    "&" + encodeURIComponent("owner_birth") + "=" + encodeURIComponent(""); /**/
  queryParams +=
    "&" + encodeURIComponent("_type") + "=" + encodeURIComponent(" "); /**/
  xhr.open("GET", url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      alert(
        "Status: " +
          this.status +
          "nHeaders: " +
          JSON.stringify(this.getAllResponseHeaders()) +
          "nBody: " +
          this.responseText
      );
    }
  };

  xhr.send("");
};

export default Test;
