import React, { useEffect, useState } from 'react'
import ManageUser from './ManageUser'
import { MainAPI } from '../../API'

export default function GetManageUser() {
    const [users, setUsers] = useState()
    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch(`${MainAPI}/staff/user`, {
                    method: "GET"
                });

                if (!response.ok) throw new Error("Failed to connect user");

                const data = await response.json();

                setUsers(data);
            } catch (error) {
                console.error(error)
            }
        };

        fecthData();
    }, [])

    console.log(users)

    return (
        <div>
            {users && <ManageUser users={users} />}
        </div>
    )
}
