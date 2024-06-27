import { IMG_CDN_URL } from "../utils/constants"

const MovieCart = ({posterPath}) => {
  return (
    <div className="w-48 pr-4">
      <img alt="Movie Card"
      src={IMG_CDN_URL + posterPath} />
      
    </div>
  )
}

export default MovieCart;
