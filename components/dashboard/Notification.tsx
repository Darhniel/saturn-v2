'use client'
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BellIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { SaturnIcon } from '../saturn/SVG';

const notifications = [
    {
        title: "Your Portfolio is Up 8% This Month!",
        description: "Your investments are performing well, with an 8% increase in the past 30 days.",
        time: "45mins ago",
        unread: true,
        icon: <SaturnIcon />,
        logo: true
    },
    {
        title: "Deposit Successful",
        description: "Your deposit of $50,000 has been successfully credited to your Saturn account.",
        time: "45mins ago",
        unread: true,
        icon: <ArrowUpRightIcon width={22} height={22} />,
        logo: false
    },
    {
        title: "Account Created Successfully",
        description: "Welcome to Saturn! Explore investment opportunities now.",
        time: "2hrs ago",
        unread: true,
        icon: <SaturnIcon />,
        logo: true
    }
]

export default function Notifications() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle the dropdown when the bell icon is clicked
    const handleIconClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the global click handler from closing immediately
        setIsOpen(!isOpen);
    };

    // Close the dropdown when clicking anywhere outside it
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // Add listener
        document.addEventListener('click', handleOutsideClick);

        // Cleanup
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleSeeAllNotifications = () => {
        router.push('/dashboard/settings?tab=notification')
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className='bg-[#E7E7E7] rounded-full p-4 cursor-pointer'
                onClick={handleIconClick}
            >
                <BellIcon
                    width={24}
                    height={24}
                />

                {isOpen && (
                    <div
                        className="absolute right-0 top-full mt-2 w-[30rem] rounded-lg border border-gray-200 bg-white shadow-md h-[25rem] overflow-y-scroll z-50"
                    >
                        <div className="space-y-4">
                            {notifications.map((notification, index) => (
                                <div key={index} className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-100 transition border-b border-gray-100">
                                    <div className="flex items-start space-x-4">
                                        <div className={`p-3 rounded-full ${notification.logo ? "bg-purple" : "bg-gray-300 text-gray-600"}`}>
                                            {notification.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{notification.title}</h3>
                                            <p className={`text-sm ${notification.unread ? "text-gray-700" : "text-gray-400"}`}>
                                                {notification.description}
                                            </p>
                                            <span className="text-sm text-gray-500">{notification.time}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            notification.unread && <span className="w-2.5 h-2.5 bg-purple rounded-full block"></span>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="w-full p-4 text-white bg-purple transition-colors rounded-b-lg"
                            onClick={handleSeeAllNotifications}
                        >
                            See all Notifications
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}