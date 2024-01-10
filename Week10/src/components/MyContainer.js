import MyList from "./MyList"
import { useState } from 'react';

const MyContainer = () => {
  const ListHeader = 'Really epic list component';
  const [items, setItems] = useState([
      { id: '1', text: 'This is Item 1', clicked: false},
      { id: '2', text: 'This is Item 2', clicked: false},
  ])
    
  const [newText, setNewText] = useState('');

  const addText = () => {
      const item = {id:items.length+1, text:newText, clicked: false}
      setItems([...items, item])
      setNewText('')
  }

  const itemClick = (id) => {
    setItems((pre) =>
      pre.map((item) =>
        item.id === id ? { ...item, clicked: !item.clicked } : item
      )
    )
  }

  return (
    <div>
        <MyList header={ListHeader} items={items} onItemClick={itemClick} />
        <textarea placeholder="Add text" onChange={(e) => setNewText(e.target.value)} value={newText}/>
        <button onClick={addText}> Add text </button>
    </div>
  )
}

export default MyContainer
