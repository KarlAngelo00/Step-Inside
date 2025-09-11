import React from "react";
import "./SocialMedia.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
  // ✅ Replace this with your actual deployed link
  const projectUrl = encodeURIComponent("https://your-museum-https-link.com");
  const projectTitle = encodeURIComponent("Check out my Virtual Museum Project!");

  const socialLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${projectUrl}`,
      icon: <FaFacebookF />,
      color: "#1877F2",
    },
    {
      name: "Twitter/X",
      url: `https://twitter.com/intent/tweet?url=${projectUrl}&text=${projectTitle}`,
      icon: <FaXTwitter />,
      color: "#000000",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${projectUrl}`,
      icon: <FaLinkedinIn />,
      color: "#0A66C2",
    },
    // ⚠️ Instagram, TikTok, YouTube don’t allow direct URL sharing
    // You can instead link them to your profile/channel
    {
      name: "Instagram",
      url: "https://instagram.com/yourprofile",
      icon: <FaInstagram />,
      color: "#E4405F",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@yourchannel",
      icon: <FaYoutube />,
      color: "#FF0000",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@yourprofile",
      icon: <FaTiktok />,
      color: "#000000",
    },
  ];

  const handleSocialClick = (url, platformName) => {
    console.log(`User clicked on ${platformName}`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="floating-icons">
      {socialLinks.map((social) => (
        <button
          key={social.name}
          onClick={() => handleSocialClick(social.url, social.name)}
          className="social-icon"
          style={{ "--social-color": social.color }}
          title={`Share on ${social.name}`}
        >
          {social.icon}
        </button>
      ))}
    </div>
  );
};

export default SocialMedia;
