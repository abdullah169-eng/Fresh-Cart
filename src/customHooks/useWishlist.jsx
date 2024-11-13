import toast from "react-hot-toast";
import { wishContext } from "../context/WishContext";
import { useContext } from "react";

export default function useWishlist() {
  const { addWishProduct, allWishId, deleteWishProduct, setBite } =
    useContext(wishContext);
  // Control Adding or deleting Product at Wish-list
  async function handleWish(id) {
    setBite(id);
    if (!allWishId?.includes(id)) {
      const { resFlag, userMessage } = await addWishProduct(id);
      if (resFlag) {
        toast.success(userMessage, {
          duration: 2000,
        });
      } else {
        toast.error(userMessage, {
          duration: 2000,
        });
      }
    } else {
      const { resFlag, userMessage } = await deleteWishProduct(id);
      if (resFlag) {
        toast.success(userMessage, {
          duration: 2000,
        });
      } else {
        toast.error(userMessage, {
          duration: 2000,
        });
      }
    }
    setBite(null);
  }

  return { handleWish };
}
