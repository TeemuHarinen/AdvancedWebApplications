import React, { useEffect, useState } from 'react';

function About() {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {

        const resp = await fetch("https://jsonplaceholder.typicode.com/posts")
        const json = await resp.json();
        setData(json);
      }
      fetchData();
    }, []);

  return (
    <div>
        <h1>This is Aboyt</h1>
        <ul>
            {data.map((item) => {
                return (
                <li key={item.id}>{item.title}</li>
            );
            })}
        </ul>
    </div>
  )
}

export default About