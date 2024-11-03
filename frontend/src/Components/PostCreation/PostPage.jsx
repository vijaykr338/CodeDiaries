import React, { useEffect, useState , useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { Link } from "react-router-dom";

import CommentBox from './comment'
import { AuthContext } from "../../AuthContext";

import person from "./person.jpg";
import { FaHome, FaUser, FaEnvelope, FaCog } from "react-icons/fa";

const PostPage = () => {

  const { user } = useContext(AuthContext);
  
  
    const [content, setContent] = useState(
      `<p>
  
  <br></p><p><strong style="font-size: 32px;">What is the future of Web3?</strong><br><span style="font-family: Georgia, Palatino, serif;"><br>Web 3.0 blockchain is expected to impact almost every industry ubiquitously, invading various professional fields. The technology has already outlined its effectiveness in ensuring the security of cryptocurrencies and NFTs, and its adoption is now forecasted for tokenizing applications. Web3 outreaches virtual reality, commonly related to the technology vision, and offers multiple revolutionizing solutions.<br><br>As outlined above, Web 3.0 involves new standards of data usage and protection, rapid and efficient processing of information, and an increase in transparency. Therefore, Web3 will bring with itself not only the innovative sparkle for opportunities but also will be directly implemented in how companies operate. At a certain point, distinguishing the impacts of the technology from the operating flow of particular industries will be impossible.<br></span></p><p><span style="font-family: Georgia, Palatino, serif;"><br></span></p><p><span style="font-family: Georgia, Palatino, serif;"> <span style="font-size: 24px;">Web3 Industry Trends In 2024</span><br><br>The potential of Web3 is undoubtedly ubiquitous. However, the high number of promising prospects put in shadow the characteristics of Web3 that are already a fact. Within this section, we aim to outline and underline these core characteristics by listing 20 Web3 industry trends. Take a peek into the present and future.</span></p><p><span style="font-family: Georgia, Palatino, serif;"><strong><br><em>1. GameFi: The Fusion of Gaming and Finance</em></strong><br><br>Can gaming and finance go together? They always have been, but it isn’t just about fun anymore; it’s about real-world benefits too. GameFI shows a change in the gaming industry, combining both entertainment and finance. In 2024, GameFi experiences a rise in growth, with games like “EtherQuest” leading that charge. These virtual words incentivize players with crypto rewards for achievements inside the game, creating immersive experiences with economic benefits. GameFi not only enhances player engagement, but also introduces unique economic models that are paving the way for a new era of immersive gaming.<br><br><strong><img src="https://preview.redd.it/persona-5-will-be-my-first-rpg-any-combat-advice-v0-ftmg64w0qhfb1.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=6763b0e24fe2cabad6b5c93d4f8f45f6dfc9cb77" alt="" width="590" height="334" style="display: block; margin-left: auto; margin-right: auto;"></strong></span></p><div id="div_block-2065-539" class="ct-div-block"><h3 id="headline-2066-539" class="ct-headline heading-3-blog"><strong><span style="font-family: Georgia, Palatino, serif;"><em>2.&nbsp;Tokenization of real-world assets</em></span></strong></h3><p><span style="font-family: Georgia, Palatino, serif;"><br></span></p><div id="_rich_text-2067-539" class="oxy-rich-text text-blog"><p><span style="font-family: Georgia, Palatino, serif;">The
  
   tokenization of real-world assets reaches new heights in 2024, 
  
  combining physical and digital assets. Think properties, art pieces, and
  
   even corporate debt becoming more accessible and liquid through 
  
  blockchain technology, unlocking previously untapped markets for a wider
  
   range of investors. This democratization of investment opportunities 
  
  offers diversity and liquidity in portfolio management. Imagine having a
  
   stake in the art world or property market without needing a fortune to 
  
  start.</span></p><p><em><span style="font-family: Georgia, Palatino, serif;"><br></span></em></p></div></div><div id="div_block-2068-539" class="ct-div-block"><h3 id="headline-2069-539" class="ct-headline heading-3-blog"><em><span style="font-family: Georgia, Palatino, serif;"><strong>3.&nbsp;NFTs for Identity Verification and Beyond</strong></span></em></h3><p><span style="font-family: Georgia, Palatino, serif;"><br></span></p><div id="_rich_text-2070-539" class="oxy-rich-text text-blog"><p><span style="font-family: Georgia, Palatino, serif;">NFTs,
  
   once just digital art collectibles, transcend their origins in digital 
  
  art by branching out into identity verification, intellectual property 
  
  rights management, and supply chain tracking. In 2024, NFTs extend 
  
  beyond the real of collectibles, demonstrating their potential to change
  
   various industries and successes. It’s like a digital passport for your
  
   identity, or a tracking system for products from creation to your 
  
  doorstep.<br><br></span></p><div id="div_block-2071-539" class="ct-div-block"><h3 id="headline-2072-539" class="ct-headline heading-3-blog"><span style="font-family: Georgia, Palatino, serif;"><strong><em>4.&nbsp;Rise of Creator Economies</em></strong></span></h3><p><span style="font-family: Georgia, Palatino, serif;"><br></span></p><div id="_rich_text-2073-539" class="oxy-rich-text text-blog"><p><span style="font-family: Georgia, Palatino, serif;">Creator
  
   economies will flourish even more in 2024, powered by the growth of 
  
  social tokens and blockchain tech. Content creators, artists, and 
  
  influencers will make use of blockchain tech to issue their own personal
  
   tokens with their own branding, enabling direct investment from their 
  
  fanbase. This change will empower creators to monetize their content, 
  
  and engage with their audience on their terms. It’s a new way of 
  
  supporting the content you love while giving creators the freedom to do 
  
  what they do best.</span></p><p><span style="font-family: Georgia, Palatino, serif;"><br></span></p><p><span style="font-family: Georgia, Palatino, serif;"><img src="https://images.prismic.io/fabrick/e6583d54-b92d-4871-8de9-000a31884eb7_Blockchain%20-%20Articolo.png?ixlib=gatsbyFP&amp;auto=compress%2Cformat&amp;fit=max" alt="" width="594" height="252" style="display: block; margin-left: auto; margin-right: auto;"></span></p><p><span style="font-family: Georgia, Palatino, serif;"><br></span></p></div></div><div id="div_block-2075-539" class="ct-div-block"><h3 id="headline-2076-539" class="ct-headline heading-3-blog"><span style="font-family: Georgia, Palatino, serif;"><strong>5.&nbsp;Decentralization</strong></span></h3><p><span style="font-family: Georgia, Palatino, serif;"><br></span></p><div id="_rich_text-2077-539" class="oxy-rich-text text-blog"><p><span style="font-family: Georgia, Palatino, serif;">Decentralization
  
   is within the core heart of Web3. In contrast to the previous versions,
  
   Web 3.0. aim to give more control to the users and builders of the 
  
  network by decentralizing governance, transaction, and infrastructure. 
  
  Decentralization implies no central control over users’ activities, but 
  
  the control will be distributed between builders and users. This 
  
  completely contrasts with the current Internet, primarily controlled and
  
   owned by centralized entities. The decentralization will be achieved 
  
  through critical infrastructure components such as storage in a 
  
  resilient global network that an entity or individual cannot control or 
  
  take down. This will bring users’ trust in the Web back, allowing them 
  
  to communicate confidently, create, and explore within the digital 
  
  space.
  `
    );
  const [post, setPost] = useState(null);
  const { id } = useParams();

  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/getpost/${id}`);
        setPost(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  console.log("post details:" , post );



  return (
   <>
     <div className="w-full mx-auto px-8 bg-black pb-5 pt-5 ">
    <h1 className="text-5xl text-white font-semibold italic mb-4">{post.title}</h1>

    <div className="flex items-center mb-6">
      <img src={person} alt="Author" className="rounded-full h-16 w-16 border-2 border-gray-300" />
      <div className="ml-4">
        <span className="text-lg font-bold text-white">{post.authorName}</span>
        <span className="block text-sm text-white ">{post.date}</span>
      </div>
    </div>

    <img src={post.coverimg} alt="Cover" className="w-full rounded-lg mb-8 shadow-md" />

    <div className="flex mb-10">
      <nav className="flex-shrink-0 sticky top-0 p-4 bg-gray-100 rounded-lg shadow-md">
        <ul className="space-y-4">
          <li>
            <a href="/" className="flex items-center space-x-2 hover:text-blue-600">
              <FaHome size={24} />
              <Link to="/">Home</Link>
            </a>
          </li>
          <li>
            <a href={`/profile/${post.authorName}`} className="flex items-center space-x-2 hover:text-blue-600">
              <FaUser size={24} />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a href="#link3" className="flex items-center space-x-2 hover:text-blue-600">
              <FaEnvelope size={24} />
              <span>Messages</span>
            </a>
          </li>
          <li>
            <a href="#link4" className="flex items-center space-x-2 hover:text-blue-600">
              <FaCog size={24} />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex-1 p-6 mx-4 bg-white rounded-lg shadow-md">
        <div className="text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  </div>
    { user && <CommentBox user={post.authorName} />}

   </>
  );
};

export default PostPage;