import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import gfm from "remark-gfm";
import loadable from "@loadable/component";
import styled from "styled-components";

const ReactMarkdown = loadable(() => import("react-markdown"));

const YoutubeIframe = ({ url }) => {
  return (
    <iframe
      src={url}
      alt="youtube"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

const ExternalContentFromCMS = ({place, position = "Top",renderedBy, firstSupplierVid}) => {

  const LocationsEnum = Object.freeze({
    category: "categories?URL",
    product: "supplier-product-banners?VID",
    singleproduct: "product-pages?URL",
    supplier: "supplier-pages?URL",
    home: "home-categories?URL",
    ads: "my-ads?URL",
    banners: "marketplace-home-pages"
  });

  const location = useRouter();
  console.log(location);

  const [remoteDataStrapi, setRemoteDataStrapi] = useState({
    loading: false,
    data: [1]
  });

  useEffect(() => {
    setRemoteDataStrapi({ loading: true, data: [] });
    const fetchData = async () => {
      if (LocationsEnum[place] === "supplier-product-banners?VID") {
        console.log(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=${firstSupplierVid}&URL=https://b2bndemo1-preview.avetti.io/`
        );
        return await fetch(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=${firstSupplierVid}&URL=https://b2bndemo1-preview.avetti.io/`
        );
      } 
      else if (LocationsEnum[place] === "product-pages?URL") {
        console.log(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=${process.env.PUBLISH_PROJECT_LINK}retail${location.asPath}`
        );
        return await fetch(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=${process.env.PUBLISH_PROJECT_LINK}retail${location.asPath}`
        );
      } 
      else if (LocationsEnum[place] === "supplier-pages?URL") {
        console.log(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=${location.origin}${location.pathname.substring(0, 8) + location.pathname.substring(8).replace("/", "")}`
        );
        return await fetch(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=${location.origin}${location.pathname.substring(0, 8) + location.pathname.substring(8).replace("/", "")}`
        );
      } 
      else if (LocationsEnum[place] === "marketplace-home-pages") {
        console.log(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum.banners}?URL=https://b2bndemo1-preview.avetti.io/`
        );
        return await fetch(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum.banners}?URL=https://b2bndemo1-preview.avetti.io/`
        );
      } 
      else {
        console.log(
          `${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=https://b2bndemo1-preview.avetti.io/${location.asPath}`
        );
        return await fetch(`${process.env.NEXT_AVETTI_CMS}/${LocationsEnum[place]}=https://b2bndemo1-preview.avetti.io${location.asPath}`);
      }
    };
    fetchData()
      .then(response => response.json())
      .then(data => setRemoteDataStrapi({ loading: false, data: data[0] }));
    return () => {};
  }, []);

  const constructYouTubeUrl = rowUrl => {
    try {
      const url = new URL(rowUrl);
      const param = url.searchParams.get("v");
      url.host = "youtube.com";
      url.pathname = "embed/".concat(param);
      return url.href;
    } catch (error) {}
  };

  const MarkDown = ({ data }) => {
    return <ReactMarkdown remarkPlugins={[gfm]}>{data}</ReactMarkdown>;
  };

  var current = new Date();

  const StyledP = styled.div`
    p, h1, h2, h3, h4, h5, h6, div {
      color: ${({ color }) => color};
    }
  `;

  switch (place) {
    case "home":
      return (
        <>
          {remoteDataStrapi.data?.ContentEntries?.filter(
            el => el.Position === position
          )?.map(el => (
            <div
              key={el.Description}
              className="strapiWrapper"
              style={{ padding: "", backgroundColor: el.Color }}
            >
              {console.log("test22 el", el)}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Right" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

            {el.Images && el.Description && el.Description.Position === "Text_Over_Image" && (
              <>
              <div className="container">
                <img
                    src={el.Images.img.url}
                    layout="responsive"
                    height={el.Images.height}
                    width="auto" 
                    style={{borderRadius: "0%"}}
                  />
                <div className="centered">
                <StyledP color={el.Description.FontColor}>
                  <div style={{fontWeight:"bold"}}>{el.Title}</div>
                  <MarkDown data={el.Description.Desc} />
                </StyledP>
                {el.ButtonText && (
                  <div className="strapiFooterCentre">
                  <a href={el.LinkURL} target="_blank" rel="noreferrer">
                    {el.ButtonText}
                  </a>
                </div>
                )}
                </div>
              </div>
            </>
            )}

              {el.Description == null && el.Images && el.YoutubeVideo == null && (
                <>
                  {el.Title && (
                    <div className="strapiMainFull">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                    </div>
                  )}
                  <div className="strapiHeaderFullW">
                    <a href={el.Images.URL}>
                      <picture>
                        {el.Images.img_mobile && (
                          <source
                            media="(max-width:768px)"
                            srcSet={el.Images.img_mobile.url}
                          />
                        )}
                        <img
                          src={el.Images.img.url}
                          alt="header image"
                          height={el.Images.height}
                          width="auto"
                        />
                      </picture>
                    </a>
                  </div>
                </>
              )}

              {el.Title &&
                el.Description == null &&
                el.Images == null &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Top" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Bottom" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {/* {el.Description == null && el.Images !== null && el.YoutubeVideo == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                  </div>
                  <div className="strapiHeaderFullW">
                    <picture>
                      {(el.Images.img_mobile && 
                    <source media="(max-width:768px)" srcSet={el.Images.img_mobile.url}/>
                    )}
                      <img
                        src={el.Images.img.url}
                        
                        height={el.Images.height}
                        width="auto" 
                      />
                    </picture>
                  </div>
                </>
              )} */}

              {el.Description && el.Description.Position === "Scrolling" && (
                <div className="scroll-left">
                  <StyledP color={el.Description.FontColor}>
                    <MarkDown data={el.Description.Desc} />
                  </StyledP>
                </div>
              )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Bottom" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                  </>
                )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "FullWidth" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFullW">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-R">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Bottom" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                  </>
                )}

              {/* here */}

              {el.YoutubeVideo && el.Description == null && el.Images == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                    {el.ButtonText && (
                      <div className="strapiFooter">
                        <a href={el.LinkURL} target="_blank" rel="noreferrer">
                          {el.ButtonText}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="strapiHeader">
                    <YoutubeIframe
                      url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                    />
                  </div>
                </>
              )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description && (
                  <>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Top" && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Bottom" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
          ))}
        </>
      );
    case "product":
      return (
        <>
          {remoteDataStrapi.data?.ContentEntries?.filter(
            el => el.Position === position
          )?.map(el => (
            <div
              key={el.Description}
              className="strapiWrapper"
              style={{ padding: "", backgroundColor: el.Color }}
            >
              {console.log("test22 el", el)}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Right" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.Images && el.Description && el.Description.Position === "Text_Over_Image" && (
              <>
              <div className="container">
                <img
                    src={el.Images.img.url}
                    layout="responsive"
                    height={el.Images.height}
                    width="auto" 
                    style={{borderRadius: "0%"}}
                  />
                <div className="centered">
                <StyledP color={el.Description.FontColor}>
                  <div style={{fontWeight:"bold"}}>{el.Title}</div>
                  <MarkDown data={el.Description.Desc} />
                </StyledP>
                {el.ButtonText && (
                  <div className="strapiFooterCentre">
                  <a href={el.LinkURL} target="_blank" rel="noreferrer">
                    {el.ButtonText}
                  </a>
                </div>
                )}
                </div>
              </div>
            </>
            )}

              {el.Description == null && el.Images && el.YoutubeVideo == null && (
                <>
                  {el.Title && (
                    <div className="strapiMainFull">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                    </div>
                  )}
                  <div className="strapiHeaderFullW">
                    <a href={el.Images.URL}>
                      <picture>
                        {el.Images.img_mobile && (
                          <source
                            media="(max-width:768px)"
                            srcSet={el.Images.img_mobile.url}
                          />
                        )}
                        <img
                          src={el.Images.img.url}
                          alt="header image"
                          height={el.Images.height}
                          width="auto"
                        />
                      </picture>
                    </a>
                  </div>
                </>
              )}

              {el.Title &&
                el.Description == null &&
                el.Images == null &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Top" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Bottom" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {/* {el.Description == null && el.Images !== null && el.YoutubeVideo == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                  </div>
                  <div className="strapiHeaderFullW">
                    <picture>
                      {(el.Images.img_mobile && 
                    <source media="(max-width:768px)" srcSet={el.Images.img_mobile.url}/>
                    )}
                      <img
                        src={el.Images.img.url}
                        
                        height={el.Images.height}
                        width="auto" 
                      />
                    </picture>
                  </div>
                </>
              )} */}

              {el.Description && el.Description.Position === "Scrolling" && (
                <div className="scroll-left">
                  <StyledP color={el.Description.FontColor}>
                    <MarkDown data={el.Description.Desc} />
                  </StyledP>
                </div>
              )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Bottom" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                  </>
                )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "FullWidth" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFullW">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-R">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Bottom" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                  </>
                )}

              {/* here */}

              {el.YoutubeVideo && el.Description == null && el.Images == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                    {el.ButtonText && (
                      <div className="strapiFooter">
                        <a href={el.LinkURL} target="_blank" rel="noreferrer">
                          {el.ButtonText}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="strapiHeader">
                    <YoutubeIframe
                      url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                    />
                  </div>
                </>
              )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description && (
                  <>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Top" && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Bottom" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
          ))}
        </>
      );
    case "singleproduct":
      return (
        <>
          {remoteDataStrapi.data?.ContentEntries?.filter(
            el => el.Position === position
          )?.map(el => (
            <div
              key={el.Description}
              className="strapiWrapper"
              style={{ padding: "", backgroundColor: el.Color }}
            >
              {console.log("test22 el", el)}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Right" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

            {el.Images && el.Description && el.Description.Position === "Text_Over_Image" && (
              <>
              <div className="container">
                <img
                    src={el.Images.img.url}
                    layout="responsive"
                    height={el.Images.height}
                    width="auto" 
                    style={{borderRadius: "0%"}}
                  />
                <div className="centered">
                <StyledP color={el.Description.FontColor}>
                  <div style={{fontWeight:"bold"}}>{el.Title}</div>
                  <MarkDown data={el.Description.Desc} />
                </StyledP>
                {el.ButtonText && (
                  <div className="strapiFooterCentre">
                  <a href={el.LinkURL} target="_blank" rel="noreferrer">
                    {el.ButtonText}
                  </a>
                </div>
                )}
                </div>
              </div>
            </>
            )}

              {el.Description == null && el.Images && el.YoutubeVideo == null && (
                <>
                  {el.Title && (
                    <div className="strapiMainFull">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                    </div>
                  )}
                  <div className="strapiHeaderFullW">
                    <a href={el.Images.URL}>
                      <picture>
                        {el.Images.img_mobile && (
                          <source
                            media="(max-width:768px)"
                            srcSet={el.Images.img_mobile.url}
                          />
                        )}
                        <img
                          src={el.Images.img.url}
                          alt="header image"
                          height={el.Images.height}
                          width="auto"
                        />
                      </picture>
                    </a>
                  </div>
                </>
              )}

              {el.Title &&
                el.Description == null &&
                el.Images == null &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Top" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Bottom" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {/* {el.Description == null && el.Images !== null && el.YoutubeVideo == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                  </div>
                  <div className="strapiHeaderFullW">
                    <picture>
                      {(el.Images.img_mobile && 
                    <source media="(max-width:768px)" srcSet={el.Images.img_mobile.url}/>
                    )}
                      <img
                        src={el.Images.img.url}
                        
                        height={el.Images.height}
                        width="auto" 
                      />
                    </picture>
                  </div>
                </>
              )} */}

              {el.Description && el.Description.Position === "Scrolling" && (
                <div className="scroll-left">
                  <StyledP color={el.Description.FontColor}>
                    <MarkDown data={el.Description.Desc} />
                  </StyledP>
                </div>
              )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Bottom" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                  </>
                )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "FullWidth" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFullW">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-R">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Bottom" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                  </>
                )}

              {/* here */}

              {el.YoutubeVideo && el.Description == null && el.Images == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                    {el.ButtonText && (
                      <div className="strapiFooter">
                        <a href={el.LinkURL} target="_blank" rel="noreferrer">
                          {el.ButtonText}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="strapiHeader">
                    <YoutubeIframe
                      url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                    />
                  </div>
                </>
              )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description && (
                  <>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Top" && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Bottom" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
          ))}
        </>
      );
    case "supplier":
      return (
        <>
          {remoteDataStrapi.data?.ContentEntries?.filter(
            el => el.Position === position
          )?.map(el => (
            <div
              key={el.Description}
              className="strapiWrapper"
              style={{ padding: "", backgroundColor: el.Color }}
            >
              {console.log("test22 el", el)}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Right" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

            {el.Images && el.Description && el.Description.Position === "Text_Over_Image" && (
              <>
              <div className="container">
                <img
                    src={el.Images.img.url}
                    layout="responsive"
                    height={el.Images.height}
                    width="auto" 
                    style={{borderRadius: "0%"}}
                  />
                <div className="centered">
                <StyledP color={el.Description.FontColor}>
                  <div style={{fontWeight:"bold"}}>{el.Title}</div>
                  <MarkDown data={el.Description.Desc} />
                </StyledP>
                {el.ButtonText && (
                  <div className="strapiFooterCentre">
                  <a href={el.LinkURL} target="_blank" rel="noreferrer">
                    {el.ButtonText}
                  </a>
                </div>
                )}
                </div>
              </div>
            </>
            )}

              {el.Description == null && el.Images && el.YoutubeVideo == null && (
                <>
                  {el.Title && (
                    <div className="strapiMainFull">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                    </div>
                  )}
                  <div className="strapiHeaderFullW">
                    <a href={el.Images.URL}>
                      <picture>
                        {el.Images.img_mobile && (
                          <source
                            media="(max-width:768px)"
                            srcSet={el.Images.img_mobile.url}
                          />
                        )}
                        <img
                          src={el.Images.img.url}
                          alt="header image"
                          height={el.Images.height}
                          width="auto"
                        />
                      </picture>
                    </a>
                  </div>
                </>
              )}

              {el.Title &&
                el.Description == null &&
                el.Images == null &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMain">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Top" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Bottom" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {/* {el.Description == null && el.Images !== null && el.YoutubeVideo == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                  </div>
                  <div className="strapiHeaderFullW">
                    <picture>
                      {(el.Images.img_mobile && 
                    <source media="(max-width:768px)" srcSet={el.Images.img_mobile.url}/>
                    )}
                      <img
                        src={el.Images.img.url}
                        
                        height={el.Images.height}
                        width="auto" 
                      />
                    </picture>
                  </div>
                </>
              )} */}

              {el.Description && el.Description.Position === "Scrolling" && (
                <div className="scroll-left">
                  <StyledP color={el.Description.FontColor}>
                    <MarkDown data={el.Description.Desc} />
                  </StyledP>
                </div>
              )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Bottom" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                  </>
                )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "FullWidth" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null && (
                  <>
                    <div className="strapiHeaderFullW">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-R">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Bottom" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                  </>
                )}

              {/* here */}

              {el.YoutubeVideo && el.Description == null && el.Images == null && (
                <>
                  <div className="strapiMainFull">
                    {el.Title && (
                      <div className="strapiHeaderTitle">{el.Title}</div>
                    )}
                    {el.ButtonText && (
                      <div className="strapiFooter">
                        <a href={el.LinkURL} target="_blank" rel="noreferrer">
                          {el.ButtonText}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="strapiHeader">
                    <YoutubeIframe
                      url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                    />
                  </div>
                </>
              )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description && (
                  <>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description == null && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Top" && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Bottom" && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
          ))}
        </>
      );
    case "banners":
      return (
        <>
          {remoteDataStrapi.data?.ContentEntries?.filter(
            el => el.Position === position
          )?.map(el => (
            <div
              key={el.Description}
              className="strapiWrapper"
              style={{ padding: "", backgroundColor: el.Color }}
            >
              {console.log(parseInt(current.getHours()) <= (parseInt(remoteDataStrapi.data.Time))  )}

              {console.log((current.getMonth() + 1))}

              {console.log(parseInt(remoteDataStrapi.data.Date.substring(5, 7)))}

              {console.log((current.getMonth() + 1) <= parseInt(remoteDataStrapi.data.Date.substring(5, 7)) )}

              {console.log(current.getDate() <= parseInt(remoteDataStrapi.data.Date.substring(8, 11)) )}

              {console.log( (parseInt(String(current.getHours()) + (current.getMinutes()<10?'0':'') + current.getMinutes())) < parseInt((remoteDataStrapi.data.Time.substring(0,2)) + (remoteDataStrapi.data.Time.substring(3, 5))))}

              {console.log(
                "current minutes",
                parseInt(
                  String(current.getHours()) +
                    (current.getMinutes() < 10 ? "0" : "") +
                    current.getMinutes()
                )
              )}

              {console.log(
                "strapi time",
                parseInt(
                  remoteDataStrapi.data.Time.substring(0, 2) +
                    remoteDataStrapi.data.Time.substring(3, 5)
                )
              )}

              {console.log( ((current.getMonth() + 1) <= parseInt(remoteDataStrapi.data.Date.substring(5, 7)) && current.getDate() <= parseInt(remoteDataStrapi.data.Date.substring(8, 11)) && parseInt(current.getHours()) <= (parseInt(remoteDataStrapi.data.Time)) && (parseInt(String(current.getHours()) + (current.getMinutes()<10?'0':'') + current.getMinutes())) < parseInt((remoteDataStrapi.data.Time.substring(0,2)) + (remoteDataStrapi.data.Time.substring(3, 5)))) || current.getDate() < parseInt(remoteDataStrapi.data.Date.substring(8, 11)))}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Right" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {console.log("this", el.ButtonText == "")}
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

                {/* {el.Images &&
                el.Description &&
                el.Images.Position === "Right" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null &&
                (
                  <>
                    <div class="containerStrapi">
                      <img src={el.Images.img.url} alt="Snow"/>
                      <div class="centeredStrapi"><StyledP color={el.Description.FontColor}><MarkDown data={el.Description.Desc} /></StyledP></div>
                    </div>
                  </>
                )} */}

                {el.Images && el.Description && el.Description.Position === "Text_Over_Image" && (((current.getMonth() + 1) <= parseInt(remoteDataStrapi.data.Date.substring(5, 7)) && current.getDate() <= parseInt(remoteDataStrapi.data.Date.substring(8, 11)) && parseInt(current.getHours()) <= (parseInt(remoteDataStrapi.data.Time)) && (parseInt(String(current.getHours()) + (current.getMinutes()<10?'0':'') + current.getMinutes() )) < parseInt((remoteDataStrapi.data.Time.substring(0,2)) + (remoteDataStrapi.data.Time.substring(3, 5)))) || current.getDate() < parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                              <>
                              <div className="container">
                                <img
                                    src={el.Images.img.url}
                                    layout="responsive"
                                    height={el.Images.height}
                                    width="auto" 
                                    style={{borderRadius:"0%"}}
                                  />
                                <div className="centered">
                                <StyledP color={el.Description.FontColor}>
                                  <div style={{fontWeight:"bold"}}>{el.Title}</div>
                                  <MarkDown data={el.Description.Desc} />
                                </StyledP>
                                {el.ButtonText && (
                                  <div className="strapiFooterCentre">
                                  <a href={el.LinkURL} target="_blank" rel="noreferrer">
                                    {el.ButtonText}
                                  </a>
                                </div>
                                )}
                                </div>
                              </div>
                            </>
                            )}

              {el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.Title &&
                el.Description == null &&
                el.Images == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMain">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images &&
                el.Images.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Top" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Images == null &&
                el.Description &&
                el.Description.Position === "Bottom" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.Description == null &&
                el.Images &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    {el.Title && (
                      <div className="strapiMainFull">
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                      </div>
                    )}
                    <div className="strapiHeaderFullW">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                  </>
                )}

              {el.Description &&
                el.Description.Position === "Scrolling" &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <div className="scroll-left">
                    <StyledP color={el.Description.FontColor}>
                      <MarkDown data={el.Description.Desc} />
                    </StyledP>
                  </div>
                )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "Bottom" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeaderFull">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                  </>
                )}

              {el.Images &&
                el.Description &&
                el.Images.Position === "FullWidth" &&
                el.Description.Position === "Default" &&
                el.YoutubeVideo == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiHeaderFullW">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            alt="header image"
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <aside className="aside strapiAsideImg-Left">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMain">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainLeft">
                      <StyledP color={el.Description.FontColor}>
                        <div className="strapiHeaderTitleRight">{el.Title}</div>
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooterLeft">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-R">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Top" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Bottom" &&
                el.Description &&
                el.Description.Position === "Default" &&
                el.Images == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.Description == null &&
                el.Images == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainFull">
                      {el.Title && (
                        <div className="strapiHeaderTitle">{el.Title}</div>
                      )}
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="strapiHeader">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Default" &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description &&
                el.Description.Position === "Default" &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainA">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Left" &&
                el.Images &&
                el.Images.Position === "Right" &&
                el.Description == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <aside className="aside strapiAsideImg-Right-A">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description == null &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Top" &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                  </>
                )}

              {el.YoutubeVideo &&
                el.YoutubeVideo.Position === "Right" &&
                el.Images &&
                el.Images.Position === "Left" &&
                el.Description &&
                el.Description.Position === "Bottom" &&
                ((current.getMonth() + 1 <=
                  parseInt(remoteDataStrapi.data.Date.substring(5, 7)) &&
                  current.getDate() <=
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11)) &&
                  parseInt(current.getHours()) <=
                    parseInt(remoteDataStrapi.data.Time) &&
                  parseInt(
                    String(current.getHours()) +
                      (current.getMinutes() < 10 ? "0" : "") +
                      current.getMinutes()
                  ) <
                    parseInt(
                      remoteDataStrapi.data.Time.substring(0, 2) +
                        remoteDataStrapi.data.Time.substring(3, 5)
                    )) ||
                  current.getDate() <
                    parseInt(remoteDataStrapi.data.Date.substring(8, 11))) && (
                  <>
                    <aside className="aside strapiAsideImg-Right-A-L">
                      <a href={el.Images.URL}>
                        <picture>
                          {el.Images.img_mobile && (
                            <source
                              media="(max-width:768px)"
                              srcSet={el.Images.img_mobile.url}
                            />
                          )}
                          <img
                            src={el.Images.img.url}
                            height={el.Images.height}
                            width="auto"
                          />
                        </picture>
                      </a>
                    </aside>
                    <aside className="aside strapiAsideImg-Left-AR-F">
                      <YoutubeIframe
                        url={constructYouTubeUrl(el.YoutubeVideo.URL)}
                      />
                    </aside>
                    <div className="strapiMainFull">
                      <StyledP color={el.Description.FontColor}>
                        {el.Title && (
                          <div className="strapiHeaderTitle">{el.Title}</div>
                        )}
                        <MarkDown data={el.Description.Desc} />
                      </StyledP>
                      {el.ButtonText && (
                        <div className="strapiFooter">
                          <a href={el.LinkURL} target="_blank" rel="noreferrer">
                            {el.ButtonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
          ))}
        </>
      );
    default:
      return null;
  }
};

export default ExternalContentFromCMS;
