import { useState, useEffect } from "react";
import type { FeedbackProps } from "../types/feedback";
import type { Order } from "../types/cart";
import { productNames } from "../imageDictionaries/productNames";
import OrdersStats from "../components/OrdersStats";
import { useTranslation } from "react-i18next";

function Dashboard() {
    const [feedbacks, setFeedbacks] = useState<Array<FeedbackProps>>([]);
    const [orders, setOrders] = useState<Array<Order>>([]);
    const [data, setData] = useState<Array<{name: string, value: number}>>([]);
    const {t} = useTranslation();

    useEffect(() => {
        const storedFeedbacks = localStorage.getItem("userFeedbackData");
        if (storedFeedbacks) {
            setFeedbacks(JSON.parse(storedFeedbacks));
        }
        const cartOrders = localStorage.getItem("orders");
        const parsedOrders = cartOrders ? JSON.parse(cartOrders) as Order[] : [];
        if (parsedOrders.length) {
            setOrders(parsedOrders);
        }

        const ordersMap = new Map<string, number>();
        parsedOrders.forEach(order => {
            order.items.forEach(item => {
                const productName = productNames[item.productId] || String(item.productId);
                ordersMap.set(productName, (ordersMap.get(productName) || 0) + item.quantity);
            });
        });

        const chartData = Array.from(ordersMap.entries()).map(([name, value]) => ({ name, value }));
        setData(chartData);
    }, [])

    const averageRating = feedbacks.length
        ? (feedbacks.reduce((acc, curr) => acc + (curr.userRating || 0), 0) / feedbacks.length)
        : "0.0";

    
    return <>
        <h2 className="dashboard-title"></h2>
        <div className="dashboard">
        <div className="dashboard-container">
            <div className="feedback-reviews">
                <div className="stats">
                    <div className="stat-card">
                        <h3>{t('feedback_reviews')}</h3>
                        <p>{t('overall_rating')}: {averageRating} ★</p>
                    </div>
                    <div className="stat-card">
                        <h4>{t('total_feedbacks')}</h4>
                        <p>{feedbacks.length}</p>
                    </div>
                </div>
                <div className="feedback-list">
                    <h3>{t('recent_feedbacks')}</h3>
                    {
                        feedbacks.length === 0 ? (
                            <div>{t('no_feedback')}</div>
                        ) : (
                            feedbacks.map((feedback, index) => (
                                <div key={index} className="feedback-item">
                                    <div className="feedback-header">
                                        <h4>{feedback.userName || "Anonymous"}</h4>
                                        <p style={{color: feedback.userRating !== null ? 'yellow': '', fontSize: '24px'}}>{feedback.userRating !== null ? Array(feedback.userRating).fill("★").join("") : "No Rating"}</p>
                                    </div>
                                    <p>{feedback.userFeedback}</p>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
        <div className="current-orders">
            <div className="stats">
                <div className="stat-card">
                    <h3>{t('orders')}</h3>
                    <p>{t('total_orders')}: {orders.length}</p>
                </div>
                <div className="stat-card">
                    <h3>{t('overall')}</h3>
                    <p>{orders.reduce((acc, curr) => acc + curr.totalPrice, 0).toFixed(2)}</p>
                </div>
            </div>
            <div className="orders-list">
                {
                    (orders.length !== 0 ? (
                        orders.map((e, index) => (
                            <div key={index} className="order-item">
                                <p>{t('order')} #{index + 1}</p>
                                <p>{t('total_price')}: ${Number(e.totalPrice).toFixed(2)}</p>
                            </div>
                        ))
                    ): (
                        <div>
                            {t('no_orders')}
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
        <div className="product-statistics">
            <OrdersStats data={data}/>
        </div>
    </>
}

export default Dashboard;