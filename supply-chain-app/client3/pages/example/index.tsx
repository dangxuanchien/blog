import AppMultipleCheckbox from '@/components/Inputs/AppMultipleCheckbox/AppMultipleCheckbox';
import React, { useState } from 'react';

const index = () => {
    const [open, setOpen] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const options = [
        {
            name: '232',
            value: '1',
        },
        {
            name: '2324',
            value: '2',
        },
        {
            name: '2325',
            value: '3',
        },
    ];
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <AppMultipleCheckbox
                options={options}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                initialValue={checkedList}
                onChange={(values) => {
                    setCheckedList(values);
                }}
            />

            <AppMultipleCheckbox
                options={options}
                open={false}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                initialValue={checkedList}
                onChange={(values) => {
                    setCheckedList(values);
                }}
            />
            <AppMultipleCheckbox
                options={options}
                open={false}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                initialValue={checkedList}
                onChange={(values) => {
                    setCheckedList(values);
                }}
            />
        </div>
    );
};

export default index;
