import { FunctionComponent, useEffect, useState } from "react";

interface contentProps {}

export interface Quote {
  _id?: string;
  author?: string;
  content?: string;
  tags?: string[];
  authorSlug?: string;
  length?: number;
  dateAdded?: Date;
  dateModified?: Date;
}

const Content: FunctionComponent<contentProps> = () => {
  const [content, setContent] = useState();
  const [quote, setQuote] = useState<Quote>();
  const [randomColor, setRandomColor] = useState("black");

  const generateDarkColor = () => {
    const r = Math.floor(Math.random() * 60);
    const g = Math.floor(Math.random() * 60);
    const b = Math.floor(Math.random() * 60);
    // return 'rgb(' + r + "," + g + ',' + b + ')'
    return `rgb(${r}, ${g}, ${b})`;
  };

  const fetchQuote = async () => {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    const color = generateDarkColor();
    setQuote(data);
    setRandomColor(color);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const changeQuote = () => {
    fetchQuote();
  };

  return (
    <div className="quote-container" style={{ background: randomColor }}>
      <p className="quote-content">"{quote?.content}"</p>
      <p className="quote-author">- {quote?.author}</p>

      <div className="button-container">
        <button onClick={changeQuote} className="change-button">
          Show other quote
        </button>
      </div>
    </div>
  );
};

export default Content;
