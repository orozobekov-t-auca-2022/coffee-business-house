import { useEffect, useState } from "react";
import Stars from "../components/Stars";
import { showSuccess } from "../components/showSuccess";
import type { FeedbackProps } from "../types/feedback";
import { useTranslation } from "react-i18next";

function Feedback() {
    const userRating = localStorage.getItem("userRating");
    const {t} = useTranslation()

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
                <h2>{t('feedback_page')}</h2>
                <p>{t('feedback_page_description')}</p>
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <div className="feedback-input-group">
                        <label htmlFor="">{t('name')}</label>
                        <input type="text" placeholder={t('name')} value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="feedback-input-group">
                        <label htmlFor="">{t('rating')}</label>
                        <Stars onChange={(newRating) => setRating(newRating)} />
                    </div>
                    <div className="feedback-input-group">
                        <label htmlFor="">{t('your_feedback')}</label>
                        <textarea rows={4} cols={50} placeholder={t('feedback_placeholder')} value={userFeedback} onChange={(e) => setUserFeedback(e.target.value)}></textarea>
                    </div>
                    <button type="submit" disabled={disabledSubmit}>{t('submit')}</button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;