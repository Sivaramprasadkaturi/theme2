import React from "react";
import styled from "styled-components";

const Item = styled.div`
  .accordion-title {
    font-weight: 600;
    cursor: pointer;
    color: #666;
    padding: 15px 1.5em 14px;
    border-top: 1px solid #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .accordion-title::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid;
  }
  .accordion-title.open:after {
    content: "";
    border-top: 0;
    border-bottom: 5px solid;
    border-top: unset;
  }
  .accordion-title:hover,
  .accordion-title.open {
    color: black;
  }
  .accordion-item {
    overflow: hidden;
    -webkit-transition: max-height 0.3s cubic-bezier(1, 0, 1, 0);
    transition: max-height 0.3s cubic-bezier(1, 0, 1, 0);
    height: auto;
    max-height: 9999px;
  }
  .accordion-item.collapsed {
    max-height: 0;
    -webkit-transition: max-height 0.35s cubic-bezier(0, 1, 0, 1);
    transition: max-height 0.35s cubic-bezier(0, 1, 0, 1);
  }
  .accordion-content {
    padding: 1.5em;
    li {
      font-size: 13px;
      color: #666;
      cursor: pointer;
      padding: 3px 6px;
      margin-bottom: 3px;
    }
  }
`;

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <Item className="accordion-wrapper">
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </Item>
  );
};

export default Accordion;
