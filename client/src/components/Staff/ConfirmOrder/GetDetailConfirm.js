import React, { useEffect, useState } from 'react';
import ConfirmOrder from './ConfirmOrder';
import { MainAPI } from '../../API';

export default function GetDetailConfirm() {

    const [dataConfirm, setDataConfirm] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${MainAPI}/staff/order`, {
                    method: "GET",
                });
                // fetch(url,option)

                if (!response.ok) throw new Error("Failed to fetch data get order");

                const data = await response.json(); // change data from json to js
                setDataConfirm(data);
            } catch (error) {
                console.error("Error fetching data order:", error);
            }
        };
        fetchData(); // call function 
    }, []);


    return (
        <div>
            {dataConfirm && <ConfirmOrder dataConfirm={dataConfirm} />}
        </div>
    );
}
