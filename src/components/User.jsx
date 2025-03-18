import React, { useState } from "react";
import "../styles.css";

const User = () => {
    const [searchId, setSearchId] = useState("");

    const handleSearchChange = (event) => {
        setSearchId(event.target.value);
        // Call your search function here if needed
    };

    return (
        <div>
            <div className="post__search">
                <a href="/">
                    <button>← Back</button>
                </a>
                <div className="post__search--container">
                    <label className="post__search--label">Search by Id</label>
                    <input 
                        type="number" 
                        placeholder="1" 
                        value={searchId} 
                        onChange={handleSearchChange} 
                    />
                </div>
            </div>
            <div className="post-list">
                <div className="post">
                    <div className="post__title">Post Title</div>
                    <p className="post__body">Post Body</p>
                </div>
            </div>
        </div>
    );
};

export default User;
