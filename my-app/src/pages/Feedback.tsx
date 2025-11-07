import { useEffect, useState } from "react";
import Stars from "../components/Stars";
import { showSuccess } from "../components/showSuccess";

interface FeedbackProps {
    userRating: number | null;
    userName: string | null;
    userFeedback: string;
}

function Feedback() {
    const userRating = localStorage.getItem("userRating");

    const [feedback, setFeedback] = useState<FeedbackProps>({
        userRating: userRating ? parseInt(userRating) : null,
        userName: null,
        userFeedback: ""
    });
    const [userName, setUserName] = useState<string>("");
    const [userFeedback, setUserFeedback] = useState<string>("");
    const [rating, setRating] = useState<number | null>(userRating ? parseInt(userRating) : null);
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        feedback.userName = userName;
        feedback.userFeedback = userFeedback;
        feedback.userRating = rating;
        localStorage.setItem("userFeedbackData", JSON.stringify([...localStorage.getItem("userFeedbackData") ? JSON.parse(localStorage.getItem("userFeedbackData") || "") : [], feedback]));
        console.log('Feedback Submitted:', feedback);
        showSuccess("Thank you for your feedback!");
        setUserName("");
        setUserFeedback("");
        setRating(null);
        setDisabledSubmit(true);

    }

    useEffect(() => {
        if (userFeedback.trim().length > 0) {
            setDisabledSubmit(false);
        } else {
            setDisabledSubmit(true);
        }
    }, [userFeedback]);


    return (
        <div className="feedback-page">
            <div className="feedback-container">
                <h2>Feedback Page</h2>
                <p>Dear customer, we value any feedback, suggestion or complaint you may have. We always strive to improve our services.</p>
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <div className="feedback-input-group">
                        <label htmlFor="">Name(Optional):</label>
                        <input type="text" placeholder="Your name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="feedback-input-group">
                        <label htmlFor="">Rating(Optional):</label>
                        <Stars onChange={(newRating) => setRating(newRating)} />
                    </div>
                    <div className="feedback-input-group">
                        <label htmlFor="">Your Feedback about our services:</label>
                        <textarea rows={4} cols={50} placeholder="Enter your feedback here..." value={userFeedback} onChange={(e) => setUserFeedback(e.target.value)}></textarea>
                    </div>
                    <button type="submit" disabled={disabledSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;