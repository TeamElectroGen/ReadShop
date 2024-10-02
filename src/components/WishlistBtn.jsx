import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Button } from './ui/button';

const WishlistBtn = ({wishListed, onWishlistClick}) => {
    
    return (
        <Button
          className="absolute hover:scale-105 transition-all group z-20 right-2 top-2 size-7 rounded-full border-none bg-white/30 hover:bg-white/50 backdrop-blur-sm"
          variant="outline"
          size="icon"
          onClick={onWishlistClick}
        >
          {wishListed ? (
            <FaHeart className="size-4 text-red-500" />
          ) : (
            <FaRegHeart className="size-4 group-hover:text-red-500 text-gray-700" />
          )}
        </Button>
    );
};

export default WishlistBtn;