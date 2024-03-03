// function Image(url, alt) {
//   return (
//     <div>
//       <img src={url.src} alt={alt} />
//     </div>
//   );

import { forwardRef } from "react";
import PropTypes from "prop-types";

// }
const Image = forwardRef(({ src, alt, id, onClick }, ref) => {
  // const [id, setId] = useState("");

  return (
    <div>
      <img id={id} ref={ref} src={src} alt={alt} onClick={onClick} />
    </div>
  );
});
Image.displayName = "Image"; // Adding displayName
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Image;
