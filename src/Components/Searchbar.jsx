import './Searchbar.css'
import { Search } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react'
import {useState} from 'react';

function Searchbar(){

    const [search, setSearch] = useState("")

    return(
        <div className='search-bar'>
            <Search size={20} />
            <input
                type='text'
                placeholder='Search in cloud'
                value={search}
                onChange={ (e) => setSearch(e.target.value)}
            />
            <SlidersHorizontal size={20} />
        </div>
    )
}

export default Searchbar;