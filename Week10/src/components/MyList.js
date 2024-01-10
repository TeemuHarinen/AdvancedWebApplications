function MyList({header, items, onItemClick}) {

  return (
    <div>
        <h1>{header}</h1>
        <ol> 
            {items.map(item => (
                <li key={item.id} style={{ textDecoration: item.clicked ? 'line-through' : '' }} onClick={() => onItemClick(item.id)} >{item.text} </li>
            ))}
        </ol>
    </div>
  )
}

export default MyList