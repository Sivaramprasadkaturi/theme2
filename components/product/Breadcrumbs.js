import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";

const Breadcrumbs = ({ breadcrumbs, family }) => {
  const lastUrlState = useSelector(
    state => state.mainReducer.lastPathCat,
    shallowEqual
  );

  return (
    <Wrapper>
      <div className="sub-nav-bread">
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="breadcrumbsList"
        >
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link href="/">
              <a itemProp="item" aria-label="item" style={{color: "#8E9CB7"}} className="home_bredcrumb1">
                <span
                  itemProp="name"
                  className="capitalize"
                  // style={{ fontSize: "13px" }}
                >
                  Home
                  {lastUrlState?.length > 0 ? (
                    <span className="ml-1">›</span>
                  ) : null}
                </span>
              </a>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {lastUrlState?.slice(2)?.map((item, i) => {
            return (
              <>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <Link
                    href={`
                    ${
                      lastUrlState
                        .join("/")
                        .replace("/product/", "/shop/")
                        .split(item)[0] + item
                    }
                      `}
                  >
                    <a itemProp="item" aria-label="item">
                      <span itemProp="name" className="ml-2 capitalize">
                        {/*{router.asPath.split("/").length -1 === i ? family.propvalue : item.replace(/-/g, " ")}*/}
                        {item.replace("shop", "home").replace(/-/g, " ")}
                      </span>
                    </a>
                  </Link>
                  <meta itemProp="position" content={i + 1} />
                </li>
                {i === lastUrlState.slice(2).length - 1 ? null : (
                  <span className="ml-1">› </span>
                )}
              </>
            );
          })}
        </ol>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sub-nav-bread {
    // padding: 15px 5%;
    padding: 8px 5.5%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f9f9f9;
  }

  grid-column: 1 / -1;

  ol {
    list-style-type: none;
    font-size: 12px;
    padding-left: 0;
    margin-top: 10px;
    display: flex;
  }

  a:visited {
    color: var(--text-color);
  }

  a:hover {
    color: var(--secondary-color);
  }

  ol > li:last-child > a {
    color: var(--primary);
    font-weight: bold;
  }

  ol > li:last-child > a:hover {
    color: var(--secondary-color);
  }

  span {
    text-transform: capitalize;
  }

  .separator {
    margin: 0 5px;
  }

  .breadcrumbsList {
    margin-left: 15px;
  }
`;

export default Breadcrumbs;
