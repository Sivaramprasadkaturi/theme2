import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { addFunctionWishList } from "../../redux/actions/wishlistActions";
import dynamic from "next/dynamic";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";

const DynamicTopbar = dynamic(() => import("../TopBar"));

const Header = ({ menu, locale }) => {
  const dispatch = useDispatch();

  const LOCAL_STORAGE_WISHLIST_NAME = "wishList";

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  useEffect(() => {
    let storedWishListString = localStorage.getItem(
      LOCAL_STORAGE_WISHLIST_NAME
    );
    let storedWishListObject = JSON.parse(storedWishListString);
    if (storedWishListObject)
      dispatch(addFunctionWishList([...storedWishListObject]));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_WISHLIST_NAME,
      JSON.stringify(wishListState)
    );
  }, [wishListState]);

  return (
    <>
      <ExternalContentFromCMS
        place="banners"
        position="Top"
        renderedBy="Header"
      />

      <header className="topbar-header">
        <DynamicTopbar menu={menu} locale={locale} />
      </header>

      <ExternalContentFromCMS
        place="banners"
        position="Middle"
        renderedBy="Header"
      />
    </>
  );
};

export default Header;
