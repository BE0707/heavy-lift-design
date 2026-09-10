import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const SEO = ({ 
  title = "Bumerang Ağır Nakliyat | Lowbed Taşımacılık & Gabari Dışı Nakliye - Diyarbakır",
  description = "Diyarbakır ve Güneydoğu merkezli gabari dışı ağır taşımacılık, 4-8 dingil lowbed dorse kiralama, iş makinesi ve şantiye nakliye çözümleri.",
  keywords = "lowbed taşımacılık, ağır nakliyat, diyarbakır ağır nakliyat, gabari dışı taşıma, iş makinesi taşıma, lowbed kiralama, ktk 33/1 eskort, teleskopik lowbed, havuzlu dorse",
  image = "https://bumerangagirnakliyat.website/og-image.png",
  type = "website"
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://bumerangagirnakliyat.website";
  const url = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // Open Graph tags
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:url", url, "property");
    updateMetaTag("og:image", image, "property");
    updateMetaTag("og:site_name", "Bumerang Ağır Nakliyat", "property");
    updateMetaTag("og:locale", "tr_TR", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, keywords, image, type, url]);

  return null;
};

export default SEO;
