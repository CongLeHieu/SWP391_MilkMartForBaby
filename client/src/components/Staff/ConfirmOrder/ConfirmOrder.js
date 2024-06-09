import React, { useState } from 'react';
import './ConfirmOrder.scss';

export default function ConfirmOrder({ dataConfirm }) {

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'cancel':
                return 'status-cancel';
            case 'confirm':
                return 'status-confirm';
            case 'pending':
                return 'status-pending';
            default:
                return '';
        }
    };

    return (
        <>
            <table className='table_confirm'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataConfirm.map((confirm, index) => (
                        <tr key={index}>
                            <td>{confirm.orderID}</td>
                            <td>{confirm.date}</td>
                            <td>{confirm.cusName}</td>
                            <td className={getStatusClass(confirm.status)}>
                                <span className="status-dot"></span>
                                {confirm.status}
                            </td>
                            <td>{confirm.amount}</td>
                            <td>
                                <button className="action-btn">▪▪▪</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
