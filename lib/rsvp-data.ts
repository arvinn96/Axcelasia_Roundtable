import { listRegistrations } from "../db";
export {filterRegistrations,registrationDate} from "./rsvp-filters";
export async function getRegistrations() {
  return listRegistrations();
}
