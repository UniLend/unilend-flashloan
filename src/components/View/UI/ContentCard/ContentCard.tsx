import React, { FC, ReactNode } from 'react'
import './ContentCard.scss'
interface Props {
    children: ReactNode,
    title: string
}

const ContentCard: FC<Props> = (props) => {
    return (
        <>
            <div className="card content-card">
                <div className="content-title">

                    <div className="card-title content-card-title">{props.title}</div>
                </div>
                <div className="card-body" style={{ padding: "1rem 2rem" }}>
                    {props.children}
                </div>
            </div>
        </>
    )
}
export default ContentCard