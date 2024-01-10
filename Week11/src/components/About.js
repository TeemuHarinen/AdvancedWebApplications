import React, { useEffect, useState } from 'react'

const About = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        const json = await res.json()
        setData(json)
      }
      fetchData()
    }, [])

  return (
    <div>
        <h1>This is About</h1>
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