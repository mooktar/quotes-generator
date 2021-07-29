const URL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

// Uility
const getQuote = (quotes) => {
  return quotes[Math.round(Math.random() * quotes.length)];
};

function QuoteCard({ quote, author }) {
  const tweetUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote}&author=${author}`;
  return (
    <figure className="card card-body">
      <blockquote id="text" className="blockquote">
        <p>"{quote}"</p>
      </blockquote>
      <figcaption id="author" className="blockquote-footer">
        {author}
      </figcaption>
      <a href={tweetUrl} id="tweet-quote" target="_blank">
        <i className="fab fa-twitter"></i>
      </a>
    </figure>
  );
}

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [quote, setQuote] = React.useState("");
  const [author, setAuthor] = React.useState("");

  React.useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const quotes = data.quotes;
        const quote = getQuote(quotes);
        setQuotes(quotes);
        setQuote(quote.quote);
        setAuthor(quote.author);
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  const handleClick = React.useCallback(() => {
    let randomQuote = getQuote(quotes);
    setQuote(randomQuote.quote);
    setAuthor(randomQuote.author);
  }, [quotes]);

  return (
    <div className="col-md-5 mx-auto">
      <QuoteCard quote={quote} author={author} />
      <button
        id="new-quote"
        className="btn btn-primary"
        onClick={handleClick}
      >
        New Quote
      </button>
      <div className="text-muted mt-3">
        By <a href="mailto:mohmouktar@gmail.com">mooktar</a>.
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#quote-box"));
