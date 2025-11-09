import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function FeedbackIcon() {
    const [showTooltip, setShowTooltip] = useState(false);
    const {t} = useTranslation()
    return (
        <div>
            {showTooltip && (
                <div className="feedback-tooltip show">
                    {t('feedback_placeholder')}
                </div>
            )}
            <Link to="/feedback" className="feedback-icon" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                <span className="material-symbols-outlined">
                    feedback
                </span>
            </Link>
        </div>
       
    )
}

export default FeedbackIcon;