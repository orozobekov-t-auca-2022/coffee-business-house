import { useState } from "react";

interface StarsProps {
    count?: number;
    defaultRating?: number;
    icon?: string;
    iconSize?: string;
    onChange?: (rating: number) => void;
}

const DEFAULT_COUNT = 5;
const DEFAULT_RATING = 0;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "gray";
const DEFAULT_COLOR = "gold";
const DEFAULT_ICON_SIZE = "40px";

function Stars({count = DEFAULT_COUNT, defaultRating = DEFAULT_RATING, icon = DEFAULT_ICON, iconSize = DEFAULT_ICON_SIZE, onChange}: StarsProps) {
    const [rating, setRating] = useState(defaultRating);
    const [temporaryRating, setTemporaryRating] = useState(0);

    const stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

    const handleClick = (rating: number) => {
        setRating(rating);
        localStorage.setItem("userRating", rating.toString());
        if (onChange) {
            onChange(rating);
        }
    }

    return <div className="starsContainer">
        {stars.map((star, index) => {
            const isActive = ((rating || temporaryRating) > index);
            return <div className="star" key={index} 
                        style={{fontSize: DEFAULT_ICON_SIZE, 
                                color: isActive ? DEFAULT_COLOR : DEFAULT_UNSELECTED_COLOR,
                                filter: isActive ? "grayScale(0%)" : "grayScale(100%)",}}
                        onMouseEnter={() => setTemporaryRating(index + 1)}
                        onMouseLeave={() => setTemporaryRating(0)}
                        onClick={() => handleClick(index + 1)}                                    
                                                            >
                    {icon ? icon : DEFAULT_ICON}
                </div>
        })}
    </div>;
}

export default Stars;