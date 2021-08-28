import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Input } from '../'

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            <Input
                size='sm'
                value={value}
                label='Search'
                type='text'
                inputChanged={(value, isInValid) => {
                    setValue(value);
                    onChange(value);
                }}
                required={false}
                width={4}
                placeholder='records records...'
            />
            {/* <Input
                label={'Search'}
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            /> */}
        </span>
    )
}

export default GlobalFilter;