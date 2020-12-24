const cls = c => c.filter(Boolean).join(" ");

const people = [
  'ella-1-a',
  'ella-1-b',
  'ella-2-a',
  'ella-2-b',
  'even-1-a',
  'even-1-b',
  'even-2-a',
  'even-2-b',
  'lotta-1-a',
  'lotta-1-b',
  'lotta-2-a',
  'lotta-2-b',
  'gaute-1-a',
  'gaute-1-b',
  'gaute-2-a',
  'gaute-2-b',
  'audun-1-a',
  'audun-1-b',
  'audun-2-a',
  'audun-2-b'
].sort(() => Math.random() - 0.5);

const Card = ({ person, turned, completed, clickCb }) => (
  <div
    onClick={() => clickCb(person)}
    style={{'--bg': `url("./images/${person.slice(0, -2)}.png")`}}
    className={cls([
      'card',
      turned && 'turned',
      completed && 'completed'
    ])}
  />
);

function Game() {

  const [selectedCards, setSelectedCards] = React.useState([]);
  const [completedCards, setCompletedCards] = React.useState([]);

  const handleClick = (person) => {

    const cards = [...selectedCards, person];

    if (cards.length == 2) {

      if (cards[0].slice(0, -1) === cards[1].slice(0, -1)) {
        setTimeout(() => setCompletedCards([...completedCards, ...cards]), 1000);
      }

      setTimeout(() => setSelectedCards([]), 1000);
    }

    setSelectedCards(cards);
  }

  return (
    <div className="game-wrapper">

      {people.map(p =>
        <Card
          person={p}
          clickCb={handleClick}
          turned={selectedCards.includes(p)}
          completed={completedCards.includes(p)}
        />
      )}

      {people.length === completedCards.length && (
        <div class="pyro">
          <div class="before" />
          <div class="after" />
        </div>
      )}

      <div
        className="bg-img"
        style={{'--blur': `blur(${people.length - completedCards.length}px)` }}
      />

    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById("app")
);
