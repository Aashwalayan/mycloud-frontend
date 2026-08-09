import './Sidebar.css'

import {
    House,
    Folder,
    Users,
    Clock3,
    Star,
    Trash2,
} from 'lucide-react';

const sidebarItems = [
    {icon: House, label: "Home"},
    {icon: Folder, label: "My Cloud"},
    {icon: Users, label: "Shared With Me"},
    {icon: Clock3, label: "Recent"},
    {icon: Star, label: "Starred"},
    {icon: Trash2, label: "Bin"}
];

function Sidebar({activeTab, setActiveTab}){


    return(
        <nav className='sidebar-nav'>
            <ul>
                {sidebarItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li 
                        key={item.label}
                        className= {activeTab === item.label ? "active" : ""}
                        onClick={() => setActiveTab(item.label)}
                        >
                            
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Sidebar