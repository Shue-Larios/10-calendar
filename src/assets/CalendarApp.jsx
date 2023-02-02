import { Provider } from "react-redux"
import { Approuter } from "../router"
import { store } from "../store"

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <Approuter />
    </Provider>
  )
}
