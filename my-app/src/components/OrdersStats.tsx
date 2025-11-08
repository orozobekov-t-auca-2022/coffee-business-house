import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function OrdersStats({ data }: {data: Array<{name: string, value: number}>}) {
    const {t} = useTranslation();
    return (
        <div className="barChart">
            <h3 style={{textAlign: 'center'}}>{t('stats_page_title_your_statistics')}</h3>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default OrdersStats