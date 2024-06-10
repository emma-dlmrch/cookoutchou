import React, { useEffect, useState } from "react";
import { Event } from "../../models"
import EventDataService from "../../services/event_service"

function EventLabel({event}:{event:Event}) {
    if(event.startDate && event.endDate) {
        return <>du {event.startDate} au {event.endDate}
                </>
    } else if(event.startDate) {
        return <>à partir du {event.startDate}</>
    } else if(event.endDate) {
        return <>jusqu'au {event.endDate}
                </>
    } else {
        return <></>
    }
}



function EventList() {

    const [events, setEvents] = useState<Array<Event>>([]);

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = () => {
        EventDataService.getAll()
            .then((response: any) => {
                setEvents(response.data.results);

            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Event !</h1>
            {events.map((event) => {
                return (
                    <p>
                        {event.name} <EventLabel event={event} /></p>
                )
            } )}
        </div>
    );
}

export default EventList;
