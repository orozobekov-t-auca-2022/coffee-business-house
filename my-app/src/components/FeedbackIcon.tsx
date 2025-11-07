import { Link } from "react-router-dom";

function FeedbackIcon() {
    return (
        <Link to="/feedback" className="feedback-icon">
            <span className="material-symbols-outlined">
                feedback
            </span>
        </Link>
    )
}

export default FeedbackIcon;