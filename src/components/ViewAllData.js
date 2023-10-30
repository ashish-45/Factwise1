import React, { useState } from 'react';
import celebritiesdata from '../celebrities.json';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { AiOutlineMinus } from 'react-icons/ai';
import './ViewAllData.css';

const ViewAllData = () => {
    const [celebrityData, setcelebrityData] = useState(celebritiesdata);
    const [openItems, setOpenItems] = useState({});
    const [searchInput, setSearchInput] = useState('');

    const toggleItem = (id) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems,
            [id]: !prevOpenItems[id],
        }));
    };

    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dobDate.getFullYear();
        return age;
    }

    const deleteCelebrity = (id) => {
        const result = window.confirm("Are you sure you want to delete?")
        if (result) {
            const updatedCelebrityData = celebrityData.filter((celebrity) => celebrity.id !== id);
            setcelebrityData(updatedCelebrityData)
        }
    }

    // Update the filtered list based on the search input
    const filteredCelebrities = celebrityData.filter((celebrity) => {
        const fullName = `${celebrity.first} ${celebrity.last}`;
        return fullName.toLowerCase().includes(searchInput.toLowerCase());
    });

    return (
        <div>
            <input
                type="text"
                placeholder="Search Users"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='inputStyle'
            />
            {filteredCelebrities.map((elem) => {
                const age = calculateAge(elem.dob);
                const isOpen = openItems[elem.id] || false;

                return (
                    <div className="card" key={elem.id}>
                        <div className="card-upperheader">
                            <div className='imagesection'>
                                <img src={elem.picture} alt="not found" />
                                <h3 >{elem.first} {elem.last}</h3>
                            </div>
                            <div onClick={() => toggleItem(elem.id)} className='toggleButton'>
                                {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                            </div>
                        </div>
                        {isOpen && (
                            <div>
                                <div className="header" >
                                    <div className='ageSection'>
                                        <p>Age</p>
                                        <p>{age} Years</p>
                                    </div>
                                    <div className='genderSection'>
                                        <p>Gender</p>
                                        <select name="gender">
                                            <option value="not say">Rather Not Say</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="transgender">Transgender</option>

                                        </select>
                                    </div>
                                    <div className="countries" >
                                        <p>Country</p>
                                        <p>{elem.country}</p>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>Description</p>
                                    <p>{elem.description}</p>
                                </div>
                                <div className='iconSection'>
                                    <p><RiDeleteBinLine className='deleteIcon' onClick={() => deleteCelebrity(elem.id)} /><span><GrEdit className='editiconSection' /></span></p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ViewAllData;
