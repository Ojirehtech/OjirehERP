import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  // PinterestShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  // PinterestIcon,
} from 'react-share';
import { isAuthenticated } from "../../helper/authenticate";

const SocialShare = ({
  url = isAuthenticated().user.refererLink, // to share current page
  title = "Ojirehprime website",
  shareImage = "https://www.steadylearner.com/static/images/brand/prop-passer.png",
  size = 50,
}) => { 
  return (
    <div style={{ display: "flex"}}>
      <li
        className="network"
        style={{ listStyle: "none", display: 'inline',}}
      >
        <FacebookShareButton
         className="network__share-button"
         url={url}
         quote={title}
        >
          <FacebookIcon
            size={size}
          />
        </FacebookShareButton>
      </li>
      <li
        className="network"
        style={{ listStyle: "none", display: 'inline', }}
      >
        <WhatsappShareButton
          className="network__share-button"
          url={url}
          quote={title}
        >
          <WhatsappIcon
            size={size}
          />
        </WhatsappShareButton>
      </li>
      <li
        className="network"
        style={{ listStyle: "none", display: 'inline', }}
      >
        <LinkedinShareButton
          className="network__share-button"
          url={url}
          quote={title}
        >
          <LinkedinIcon
            size={size}
          />
        </LinkedinShareButton>
      </li>
      
      <li
        className="network"
        style={{ listStyle: "none", display: "inline"}}
      >
        <TwitterShareButton
          className="network__share-button"
          url={url}
          title={title}
        >
          <TwitterIcon
            size={size}
          />
        </TwitterShareButton>
      </li>
    </div>
  )
}

export default SocialShare