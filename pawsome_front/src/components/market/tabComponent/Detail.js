import DOMPurify from "dompurify";

const Detail = (props) => {
  const productDetail = props.productDetail;

  return (
    <div className="text-wrap">
      {productDetail && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(productDetail)),
          }}
        />
      )}
    </div>
  );
};

export default Detail;
