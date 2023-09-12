import React from 'react'
import Star from '../Leads_Dashboard/Star'
import moment from 'moment'
import { Draggable } from 'react-beautiful-dnd'

const LeadCards = ({ leads, index }) => {
    const due = moment().isAfter(leads.date)

    return (
        <Draggable draggableId={leads._id.toString()} index={index}>
            {
                (provided) => (
                    <div className='dashboard_card' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <div className='dashboard_cardItems' key={leads._id}>
                            <p>{moment(leads.date).format('MMM Do YYYY')}</p>
                            <h3>{leads.organization}- AED 5,000.00</h3>
                            <Star stars={leads.ratings} />
                            <button className={due ? "btn_due" : "btn_notdue"} > {moment().isAfter(leads.date) ? "Overdue" : `${moment(leads.date).format('D/M/Y')}`} </button>
                        </div>
                    </div>
                )
            }

        </Draggable>

    )
}

export default LeadCards
