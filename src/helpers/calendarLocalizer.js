//  hacemos la importacion del archivo css
import 'react-big-calendar/lib/css/react-big-calendar.css';
// este hay q instalarlo date-fns
import { format, parse, startOfWeek, getDay } from "date-fns"
import esEs from 'date-fns/locale/es'
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
    'es': esEs,
  }
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });