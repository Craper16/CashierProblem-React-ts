import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [itemsInCart, setItemsInCart] = useState<number | ''>(0);
  const [peopleList, setPeopleList] = useState<number[][]>([
    [],
    [],
    [],
    [],
    [],
  ]);

  function addItemsToList(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (itemsInCart === '' || itemsInCart <= 0) return;

    let listWithLowestItems: number[] | undefined = undefined;
    let lowestListItemCount: number = 1e9;

    for (let person of peopleList) {
      const totalPersons = person.reduce((sum, value) => sum + value, 0);

      if (totalPersons < lowestListItemCount) {
        lowestListItemCount = totalPersons;
        listWithLowestItems = person;
      }
    }

    if (!listWithLowestItems) return;

    return setPeopleList((prevPeopleList) =>
      prevPeopleList.map((person) =>
        person === listWithLowestItems
          ? (person = [...person, itemsInCart as number])
          : person
      )
    );
  }

  useEffect(() => {
    const interval = setInterval(
      () =>
        setPeopleList((prevPeopleList) =>
          prevPeopleList.map((person) =>
            [person[0] - 1, ...person.slice(1)].filter((value) => value > 0)
          )
        ),
      1000 / 2
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className='App'>
      <form onSubmit={addItemsToList}>
        <input
          type='number'
          value={itemsInCart}
          onChange={(e) => {
            if (e.currentTarget.value === '') {
              setItemsInCart('');
            } else {
              setItemsInCart(e.currentTarget.valueAsNumber);
            }
          }}
        />
        <button>Checkout</button>
      </form>
      <div className='lists'>
        {peopleList.map((person, i) => (
          <div key={i}>
            X
            {person.map((itemsInCart, idx) => (
              <div key={idx}>{itemsInCart}</div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
