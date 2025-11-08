import { useState, useEffect } from "react";

interface StarsProps {
    count?: number;
    defaultRating?: number;
    icon?: string;
    iconSize?: string;
    onChange?: (rating: number) => void;
    rating?: number;
}

const DEFAULT_COUNT = 5;
const DEFAULT_RATING = 0;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "gray";
const DEFAULT_COLOR = "gold";
const DEFAULT_ICON_SIZE = "40px";

function Stars({count = DEFAULT_COUNT, defaultRating = DEFAULT_RATING, icon = DEFAULT_ICON, iconSize = DEFAULT_ICON_SIZE, onChange, rating: controlledRating}: StarsProps) {
    const [rating, setRating] = useState<number>(controlledRating ?? defaultRating);
    const [temporaryRating, setTemporaryRating] = useState(0);
    useEffect(() => {
        if (typeof controlledRating === 'number' && controlledRating !== rating) {
            setRating(controlledRating);
        }
    }, [controlledRating]);

    const stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

    const handleClick = (newRating: number) => {
        setRating(newRating);
        localStorage.setItem("userRating", newRating.toString());
        if (onChange) {
            onChange(newRating);
        }
    }

    return <div className="starsContainer">
        {stars.map((star, index) => {
            const isActive = ((rating || temporaryRating) > index);
        return <div className="star" key={index} 
            style={{fontSize: iconSize || DEFAULT_ICON_SIZE, 
                                color: isActive ? DEFAULT_COLOR : DEFAULT_UNSELECTED_COLOR,
                                filter: isActive ? "grayScale(0%)" : "grayScale(100%)",}}
                        onMouseEnter={() => setTemporaryRating(index + 1)}
                        onMouseLeave={() => setTemporaryRating(0)}
                        onClick={() => handleClick(index + 1)}                                    
                                                            >
                    {star}
                </div>
        })}
    </div>;
}

export default Stars;