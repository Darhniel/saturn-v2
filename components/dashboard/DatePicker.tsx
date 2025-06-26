import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker: React.FC = () => {
    // Set today's date as the default end date
    const today: Date = new Date();

    // Set one month ago as the default start date
    const oneMonthAgo: Date = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Initialize state for start and end dates
    const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
    const [endDate, setEndDate] = useState<Date | null>(today);

    // Handler for date range changes; react-datepicker returns an array [start, end]
    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Display the selected date range */}
            <div className='datePickerText'>
                {startDate && endDate
                    ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`
                    : 'Select date range'}
            </div>

            {/* Inline DatePicker for selecting a date range */}
            <div className='datePickerWrapper'>
                <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    withPortal
                    dateFormat="MMM d"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;