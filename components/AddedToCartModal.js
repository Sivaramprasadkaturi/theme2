import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PROJECT_LINK, VID } from "../project-config";

import { addToCartModalClose } from "../redux/actions/productActions";
import { backToCategory } from "../redux/actions/categoryActions";
import Modal from "./elements/Modal/Modal";

const AddedToCartModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(addToCartModalClose());
  };

  const productAddedToCart = useSelector(
    state => state.productReducer.addToCartSuccess,
    shallowEqual
  );

  const addToCartModeState = useSelector(
    state => state.productReducer.addToCartMode
  );

  useEffect(() => {
    setOpen(productAddedToCart);
  }, [productAddedToCart]);

  const handleViewCartClicked = () => {
    const button = document.getElementById("basket-icon-btn");
    button.click();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        className="added-to-cart-modal-wrapper"
        style={{
          backgroundColor: "white",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        <span
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "normal",
            cursor: "pointer",
            width: "20px",
            right: "0px",
            top: "0px",
            position: "absolute"
          }}
          onClick={() => handleClose()}
        >
          ×
        </span>
        <p
          id="simple-modal-description"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          The product has been added to your cart
        </p>

        {/*<a href={`${PROJECT_LINK}/basket.html?vid=${VID}`}>*/}
        <button
          className="addToCartBtn"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={handleViewCartClicked}
        >
          VIEW CART
        </button>
        {/*</a>*/}
        <button
          className="addToCartBtn"
          onClick={() => {
            dispatch(backToCategory());
            handleClose();
          }}
          style={{ backgroundColor: "#2d509f" }}
        >
          GO BACK
        </button>
      </div>
    </Modal>
  );
};

export default AddedToCartModal;
