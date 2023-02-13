import { useState } from 'react';
import './App.css';

function App() {
  const [itemsInCart, setItemsInCart] = useState<number>(0);
  const [peopleList, setPeopleList] = useState([
    [10, 5, 6],
    [1],
    [2],
    [3],
    [4],
  ]);

  console.log(peopleList);

  function addItemsToList(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let listWithLowestItems: number[];
    let lowestListItemCount: number = 1e9;

    for (let person of peopleList) {
      const totalPersons = person.reduce((sum, value) => sum + value);

      if (totalPersons < lowestListItemCount) {
        lowestListItemCount = totalPersons;
        listWithLowestItems = person;
      }
    }

    setPeopleList((prevPeopleList) =>
      prevPeopleList.map((person) =>
        person === listWithLowestItems
          ? (person = [...person, itemsInCart])
          : person
      )
    );
  }

  return (
    <main className="App">
      <form onSubmit={addItemsToList}>
        <input
          type="number"
          value={itemsInCart}
          onChange={(e) => setItemsInCart(e.currentTarget.valueAsNumber)}
        />
        <button>Checkout</button>
      </form>
      <div className="lists">
        {peopleList.map((person, i) => (
          <div key={i}>X</div>
        ))}
      </div>
    </main>
  );
}

export default App;
