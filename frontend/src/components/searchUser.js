import React, {useEffect, useState} from "react";

const getFilteredUsers = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((user) => user.full_name.toLowerCase().includes(query.toLowerCase()));
    }

export default function SearchUser() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState(null);

    let getUsers = async () => {
        console.log('Get user triggered')
        let response = await fetch('http://localhost:8000/users')
        let data = await response.json()
        setUsers(data)
    }

        useEffect(() => {
            getUsers()
            }, [])

    localStorage.setItem('users', JSON.stringify(users));
    const items = JSON.parse(localStorage.getItem('users'));
        console.log("data: ", items)

    const filteredUsers = getFilteredUsers(query, items);

    return(
      <div className="search">
        <input type="text" placeholder="Search..."  onChange={(e) => setQuery(e.target.value)}/>
          <ul>
            {users && filteredUsers.map((value) => <h3 key={value.id}>{value.full_name}</h3>)}
          </ul>
      </div>
    )
}