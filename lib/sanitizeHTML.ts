import DOMPurify from "dompurify";

// this function takes a string of HTML content and returns a sanitized version of it
// html sanitazation is important to prevent XSS (cross-site scripting) attacks
export const sanitizeHTML = (content: string) => {
  const doc = new DOMParser().parseFromString(content, "text/html");

  // remove all img tags and replace them with a placeholder
  const images = doc.querySelectorAll("img");
  images.forEach((img) => {
    const placeholder = doc.createTextNode(" [image] ");
    img.parentNode?.replaceChild(placeholder, img);
  });

  // remove all iframe tags and replace them with a placeholder
  const iframes = doc.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    const placeholder = doc.createTextNode(" [iframe/video] ");
    iframe.parentNode?.replaceChild(placeholder, iframe);
  });

  // remove all script tags
  const sanitizedData = {
    __html: DOMPurify.sanitize(doc.body.innerHTML),
  };
  return sanitizedData;
};

export const extractPContent = (html: string): string => {
  const cleanHtml = DOMPurify.sanitize(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHtml, "text/html");
  const pTags = doc.querySelectorAll("p");
  const pTexts = Array.from(pTags)
    .map((p) => p.textContent)
    .join(" ");
  return pTexts;
};
