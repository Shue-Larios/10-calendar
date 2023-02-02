import { parseISO } from "date-fns"


//  aca recibo los eventos
export const convertEventsToDateEvents = (events = []) => {

    // regreso cuyo evento esta como tipo date
    return events.map(event => {
        // para convertir el string a una fecha
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);

        return event;
    })


}
