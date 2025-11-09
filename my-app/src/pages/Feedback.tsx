import { useEffect, useState } from "react";
import Stars from "../components/Stars";
import { showSuccess } from "../components/showSuccess";
import type { FeedbackProps } from "../types/feedback";
import { useTranslation } from "react-i18next";

function Feedback() {
    const {t} = useTranslation()

    const feedback : FeedbackProps = {
        userRating: 0,
        userName: null,
        userFeedback: ""
    };
    const [userName, setUserName] = useState<string>("");
    const [userFeedback, setUserFeedback] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
    const [feedbackError, setFeedbackError] = useState<string>("");
    const [ratingError, setRatingError] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;
        if (rating === null) {
            setRatingError(t('rating_error'));
            valid = false;
        } else {
            setRatingError("");
        }

        if(userFeedback.trim().length === 0) {
            setFeedbackError(t('feedback_error'));
            valid = false;
        } else {
            setFeedbackError("");
        }

        if(!valid) return;

        feedback.userName = userName;
        feedback.userFeedback = userFeedback;
        feedback.userRating = rating;
        localStorage.setItem("userFeedbackData", JSON.stringify([...localStorage.getItem("userFeedbackData") ? JSON.parse(localStorage.getItem("userFeedbackData") || "") : [], feedback]));
        showSuccess("Thank you for your feedback!");
        setUserName("");
        setUserFeedback("");
        setRating(null);
    try { localStorage.removeItem("userRating"); } catch { /* ignore storage errors */ }
        setDisabledSubmit(true);
    }

    useEffect(() => {
        if (userFeedback.trim().length > 0 && rating !== null && rating > 0) {
            setDisabledSubmit(false);
        } else {
            setDisabledSubmit(true);
        }
    }, [userFeedback, rating]);

    useEffect(() => {
        if (rating !== null && rating > 0) {
            setRatingError("");
        }
    }, [rating]);

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
                        <Stars rating={rating ?? 0} onChange={(newRating) => setRating(newRating)} />
                        {ratingError && <p className="error-text">{ratingError}</p>}
                    </div>
                    <div className="feedback-input-group">
                        <label htmlFor="">{t('your_feedback')}</label>
                        <textarea rows={4} cols={50} placeholder={t('feedback_placeholder')} value={userFeedback} onChange={(e) => setUserFeedback(e.target.value)}></textarea>
                        {feedbackError && <p className="error-text">{feedbackError}</p>}
                    </div>
                    <button type="submit" disabled={disabledSubmit}>{t('submit')}</button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;