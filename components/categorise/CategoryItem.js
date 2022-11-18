import React from "react";
import Image from "next/image";
import styled from "styled-components";

const CategoryItem = props => {
  console.log({ item: props.item });
  return (
    <div className={`${props.className ? props.className : "w-6/12 lg:w-4/12 my-8"}`}>
      <Wrapper className="flex flex-col mx-4">
        <img
          src={
            "https://ik.imagekit.io/ls/tr:w-600/" + props.item.itemLargeImage
          }
          style={{ height: 200 }}
          alt={props.item.title}
        />
        <Title className="font-semibold text-center mt-3">
          {props.item.title}
        </Title>
        <SubTitle className="mt-2 font-normal text-center">
          {props.item.currency_sign} {props.item.price?.value.integer}.{props.item.price?.value.decimal}
        </SubTitle>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  background-color: var(--white-minus-1);
  padding: 30px;
  flex: 1;
  height: 400px;
  
  
  @media (max-width:768px){
    width: 200px;
  }
`;
const Title = styled.p`
  font-size: 18px;
  background-color: var(--white-black);
  line-height: 36px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const SubTitle = styled.p`
  font-size: 16px;
  background-color: var(--white-black);
  line-height: 28px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default CategoryItem;
