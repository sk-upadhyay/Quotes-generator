import React, { useState, useEffect } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote({
        content: response.data.content,
        author: response.data.author,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App" id="quote-box">
      <div id="text">
        <FaQuoteLeft />
        {"\t"}
        {quote.content}
        {"\t"} <FaQuoteRight />
      </div>
      <div id="author">{quote.author}</div>
      <div className="buttons">
        <div id="tweet-quote">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              quote.content + " - " + quote.author
            )}`}
            target="_blank"
          >
            <FaSquareXTwitter />
          </a>
        </div>
        <div id="new-quote">
          <button onClick={fetchQuote}>New Quote</button>
        </div>
      </div>
    </div>
  );
}
