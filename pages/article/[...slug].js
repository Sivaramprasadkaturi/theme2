import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import gfm from "remark-gfm";
import styled from "styled-components";
import loadable from "@loadable/component";
const ReactMarkdown = loadable(() => import("react-markdown"));
import axios from "axios";
import Link from "next/link";
import Moment from "react-moment";
import Head from "next/head";

export default function SingleNews() {
    const router = useRouter();

    const [article, setArticle] = useState([]);

    const [recentArticles, setRecent] = useState([]);

    const [categories, setCategories] = useState([]);

    var qs = require('qs');
  
    const query = qs.stringify({
      _where: [{ slug_ne: "press-release" }],
    });

    const queryArticle = qs.stringify({
      _where: [{'blogcategory.slug_ne': 'press-release' }, {Site: 'https://www.avetticommerce.com/' }]
    });
  
    useEffect(() => {
      axios.get(`${process.env.NEXT_AVETTI_CMS}/blogcategories?${query}`)
        .then(res => {
          setCategories(res.data);
        });
    }, []);

    useEffect(() => {
      axios.get(`${process.env.NEXT_AVETTI_CMS}/articles?${queryArticle}`)
        .then(res => {
          setRecent(res.data)
        })
        .catch(error => {
          console.log("no articles to return")
       });
    }, []);
    
    useEffect(() => {
      axios.get(`${process.env.NEXT_AVETTI_CMS}/articles?slug=${router.query.slug}`)
        .then(res => {
          setArticle(res.data[0]);
        })
        .catch(error => {
          console.log("no articles to return")
       });
    }, []);

    const MarkDown = ({ data }) => {
      return <ReactMarkdown remarkPlugins={[gfm]}>{data}</ReactMarkdown>;
    };

    return (
      
        <>
          <Wrapper>
            <Head>
              <title>{article.title}</title>
              <meta name="description" content="placeholder" />{" "}
              <meta name="keywords" content="placeholder" />{" "}
              <meta name="metakeywords" content="placeholder" />
              <meta property="og:title" content="placeholder" />
              <meta property="og:image" content={`/images/sllogo.png`} />
              <meta property="og:image:secure_url" content={`/images/sllogo.png`} />
              <meta property="og:description" content="placeholder" />{" "}
              <meta property="twitter:title" content="placeholder" />
              <meta property="twitter:description" content="placeholder" />
              <meta property="og:type" content="website" />
              <meta property="twitter:creator" content={"@avetti"} />
            </Head>
            
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
                    <div className="card-left">
                     
                      {article.image &&(
                        <img src={article.image.url}></img>
                      )}
                      <h1 className="linkText">
                        <span style={{fontWeight: "300"}}>
                          {article.title}
                        </span>
                      </h1>
                      <div>
                        <span>
                          <p>
                            <MarkDown data={article.content} />
                          </p>
                        </span>
                      </div>
                      {article.author && (
                        <div className="infobox">
                          <hr className="uk-divider-small" />
                            <p className="infoshort">
                              By {" "}
                              <Link href={`../author/${article.author.name}`}>
                                <a className="author">
                                  <span className="author">{article.author.name}</span>
                                </a>
                              </Link>
                              {" | "}
                              <Moment format="MMM Do YYYY">{article.published_at}</Moment>{" | "}
                              <Link href={`../category/${article.blogcategory.slug}`}>
                                <a className="author">
                                  <span>{article.blogcategory.name}</span>
                                </a>
                              </Link>
                            </p>
                          <hr className="uk-divider-small" />
                        </div>
                      )}
                      <div className="infobox" style={{backgroundColor: "#f6f6f6", padding: "20px"}}>
                        <h4 style={{fontSize:"18px"}}>Share this Story!</h4>
                      </div>
                    </div>
                  </div>
                  <div className="rightcolumn">
                    <div className="card">
                      <h2 className="cat-title">Categories</h2>
                      {categories?.map(el =>(
                          <>
                          <Link href={`../category/${el.slug}`}>
                          <div className="cat">
                            <a ><span >{el.name}</span></a>
                          </div>
                          </Link>
                        <hr className="uk-divider-small" />
                        </>
                      ))}
                    </div>  
                    <div className="card">
                      <h2 className="cat-title">Recent Posts</h2>
                      {recentArticles?.map(el =>(
                          <>
                          
                          <div className="cat">
                            <a href={`../article/${el.slug}`}><span>{el.title}</span></a>
                          </div>
                          
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

.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}

.infobox1 .test1{
  color: orange;
}

.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}

img{
  width: 100%;
}

p{
  font-size: 14px;
  line-height: 28px;
  margin-bottom: 20px;
  color: black;
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

h1{
  font-size: 50px;
}

h2{
  font-size: 34px;
}

h3{
  font-size: 24px;
  margin: 24px 0px;
}

h4{
  font-size: 18px;
}

h5{
  font-size: 12px;
}

h5{
  font-size: 10px;
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

.infoshort-top{
  margin: 0%;
}

.author{
  color: #2d50a0;
}

p > a {
  color: #5cc0b6;
}

 a  : hover {
  text-decoration: underline;
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
