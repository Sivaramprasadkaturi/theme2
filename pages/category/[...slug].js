import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import axios from "axios";
import Moment from "react-moment";
import Head from "next/head";

export default function SingleNews() {
    const router = useRouter();

    const [categoryArticle, setArticles] = useState([]);
    const [categoriesLS, setCategories] = useState([]);
    const [recentArticles, setRecent] = useState([]);

    var qs = require('qs');
  
    const query = qs.stringify({
      _where: [{'blogcategory.slug_ne': 'press-release' }, {Site: 'https://www.avetticommerce.com/' }]
    });

    useEffect(() => {
      axios.get(`https://cms.avetti.io/blogcategories?slug=${router.query.slug}`)
        .then(res => {
          setArticles(res.data[0]);
        });
    }, []);

    console.log(categoryArticle);

    useEffect(() => {
      axios.get(`${process.env.NEXT_AVETTI_CMS}/articles?${query}`)
        .then(res => {
          setRecent(res.data);
        });
    }, []);

    useEffect(() => {
      axios.get(`https://cms.avetti.io/blogcategories?slug_ne=press-release`)
        .then(res => {
          setCategories(res.data);
        });
    }, []);

    return (
        <>
          <Wrapper>
            <Head>
              <title>{categoryArticle?.name}</title>
            </Head>
            <div className="header">
              <h2>{categoryArticle?.name}</h2>
            </div>
            
            <div className="row">
              <div className="leftcolumn">
                <div className="card-left">
                  <div className="infobox" style={{textAlign: "right"}}>
                          <hr className="uk-divider-small" />
                          <Link href={`/news`}>
                          <a className="infoshort-top">
                              <span className="author">{"< "}Back</span>{"   "}
                              {/* <span className="author">Next{" >"}</span> */}
                            </a>
                          </Link>
                          <hr className="uk-divider-small" />
                  </div>
                </div>
                
                {categoryArticle.articles?.map(el => (
                  <>
                    {console.log(el)}
                    <div className="card-left">
                        <Link href={`../article/${el.slug}`}>
                            <a>
                              <img src={el.image.url}></img>
                            </a> 
                        </Link>
                        <Link href={`../article/${el.slug}`}>
                          <a className="linkText">
                            <span style={{fontWeight: "300"}}>
                              {el.title}
                            </span>
                          </a>
                        </Link>
                        <div className="infobox">
                          <hr className="uk-divider-small" />
                            <p className="infoshort">
                              
                              <Link href={`../author/${el.author.name}`}>
                                <a className="author">
                                <span className="author">{el.author.name}</span>
                                </a>
                              </Link>
                              
                              <Moment format="MMM Do YYYY">{el.published_at}</Moment>
                              <Link href={`category/${el.blogcategory.slug}`}>
                                <a className="author">
                                  <span >{el.blogcategory.name}</span>
                                </a>
                              </Link>
                            </p>
                          <hr className="uk-divider-small" />
                        </div>
                        <div>
                          <span className="text">
                            <p>
                              {el.content}
                            </p>
                          </span>
                          <Link href={`../article/${el.slug}`}>
                            <a className="author">
                              {" [...]"}
                            </a> 
                          </Link>
                        </div>
                        <hr className="uk-divider-small" style={{marginTop:"30px"}}/>
                    </div>
                    
                  </>
                ))}
              </div>
              <div className="rightcolumn">
                <div className="card">
                  <h2 className="cat-title">Categories</h2>
                  {categoriesLS?.map(el =>(
                      <>
                      <a href={`../category/${el.slug}`}>
                      <div className="cat">
                        <span>{el.name}</span>
                      </div>
                      </a>
                    <hr className="uk-divider-small" />
                    </>
                  ))}
                </div>  
                <div className="card">
                  <h2 className="cat-title">Recent Posts</h2>
                  {recentArticles?.map(el =>(
                      <>
                      <a href={`../article/${el.slug}`}>
                      <div className="cat">
                        <span>{el.title}</span>
                      </div>
                      </a>
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
          </Wrapper>
      </>
    );
}

const Wrapper = styled.div`

.row{
  background-color: white;
}

img{
  width: 100%;
}

.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
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
