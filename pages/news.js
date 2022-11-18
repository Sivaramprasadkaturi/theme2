import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LINK_DISTRIBUTION } from "../project-config";
import Head from "next/head";
import Link from "next/link";
import Moment from "react-moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";

import axios from "axios";
import { useRouter } from "next/router";


export async function getStaticProps({ locale }) {

  var qs = require('qs');

  const query = qs.stringify({
    _where: [{'blogcategory.slug_ne': 'press-release' }, {Site: 'https://www.avetticommerce.com/' }]
  });

  const res = await fetch(
    `${process.env.NEXT_AVETTI_CMS}/articles?${query}&_sort=published_at:DESC`
  );
  const news = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "translation", "currency-formatting"],
        { i18n }
      )),
      news
    }
  };
}

const News = ({ news }) => {
  const [categories, setCategories] = useState([]);

  var qs = require("qs");

  const query = qs.stringify({
    _where: [{ slug_ne: "press-release" }]
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_AVETTI_CMS}/blogcategories?${query}`)
      .then(res => {
        setCategories(res.data);
      });
  }, []);

  return (
    <Wrapper>
      <Head>
        <title>News</title>
      </Head>

      {news.length > 0 && (
        <>
          <div className="row">
            <div className="leftcolumn">
              {news?.map(el => (
                <>
                  <div className="card-left">
                    <Link href={`article/${el.slug}`}>
                      <a aria-label="article">
                        <img src={el.image.url} alt="article image"></img>
                      </a>
                    </Link>
                    <Link href={`article/${el.slug}`}>
                      <a className="linkText">
                        <span style={{ fontWeight: "300" }}>{el.title}</span>
                      </a>
                    </Link>
                    <div className="infobox">
                      <hr className="uk-divider-small" />
                      <p className="infoshort">
                        By{" "}
                        <Link href={`author/${el.author.name}`}>
                          <a className="author">
                            <span className="author">{el.author.name}</span>
                          </a>
                        </Link>
                        {" | "}
                        <Moment format="MMM Do YYYY">{el.published_at}</Moment>
                        {" | "}
                        <Link href={`category/${el.blogcategory.slug}`}>
                          <a className="author">
                            <span>{el.blogcategory.name}</span>
                          </a>
                        </Link>
                      </p>
                      <hr className="uk-divider-small" />
                    </div>
                    <div>
                      <span className="text">
                        <p>{el.content}</p>
                      </span>
                      <Link href={`article/${el.slug}`}>
                        <a className="author">{" [...]"}</a>
                      </Link>
                    </div>
                    <hr
                      className="uk-divider-small"
                      style={{ marginTop: "30px" }}
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="rightcolumn">
              <div className="card">
                <h2 className="cat-title">Categories</h2>
                {categories?.map(el => (
                  <>
                    <Link href={`category/${el.slug}`}>
                      <div className="cat">
                        <a>{el.name}</a>
                      </div>
                    </Link>
                    <hr className="uk-divider-small" />
                  </>
                ))}
              </div>
              <div className="card">
                <h2 className="cat-title">Recent Posts</h2>
                {news?.map(el => (
                  <>
                    <Link href={`article/${el.slug}`}>
                      <div className="cat">
                        <a>{el.title}</a>
                      </div>
                    </Link>
                    <hr className="uk-divider-small" />
                  </>
                ))}
              </div>
              <div className="card">
                <h2 className="cat-title">Archives</h2>
                <Link href={`/archive/09`}>
                  <div className="cat">
                    <a>September</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/08`}>
                  <div className="cat">
                    <a>August</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/07`}>
                  <div className="cat">
                    <a>July</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/06`}>
                  <div className="cat">
                    <a>June</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/05`}>
                  <div className="cat">
                    <a>May</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/04`}>
                  <div className="cat">
                    <a>April</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/03`}>
                  <div className="cat">
                    <a>March</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/02`}>
                  <div className="cat">
                    <a>February</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
                <Link href={`/archive/01`}>
                  <div className="cat">
                    <a>January</a>
                  </div>
                </Link>
                <hr className="uk-divider-small" />
              </div>
            </div>
          </div>
        </>
      )}

      {news.length === 0 && (
        <div className="header">
          <h2>No News to display</h2>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
.row{
  background-color: white;
}

.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}

.profile{
  width: 100px;
}

.block{
  margin-top: 10%;
}

/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {
  float: left;
  width: 75%;
}

/* Right column */
.rightcolumn {
  float: left;
  width: 25%;
  padding-left: 20px;
}

.bg-img{
  background-image: url(https://www.balodana.com/wp-content/uploads/2019/08/Balodana_Suits.jpg);
  padding: 30px;
  font-size: 40px;
  text-align: left;
}

.author-info{
  padding: 10px 0px;
}

img{
  width: 100%;
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 24px;     /* fallback */
  max-height: 71px;      /* fallback */
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.infobox{
  margin: 2% 0%;
}

.infoshort{
  margin: 2% 0%;
}

.author{
  color: #2d50a0;
}

.author  : hover {
  text-decoration: underline;
}

.cat-title{
  font-size: 18px;
  margin: 15% 0%;
  font-weight: 700;
  text-transform: uppercase;
  color: black;
}

.linkText{
  font-size: 34px;
  line-height: 65px
}

.titleText{
  font-size: 34px;
  line-height: 65px
}

.linkText : hover {
  color: #2d50a0;
}

.cat {
  padding: 10px 0px;
  color: #2d50a0;
}

.cat : hover {
  text-decoration: underline;
}

/* Fake image */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* Add a card effect for articles */
.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

.card-left {
  background-color: white;
  padding: 20px 20px 20px 40px;
  margin-top: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Footer */
.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
  margin-top: 20px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {
    width: 100%;
    padding: 0;
  }
  .card-left {
    background-color: white;
    padding: 20px;
    margin-top: 20px;
}
}
`;

export default News;
