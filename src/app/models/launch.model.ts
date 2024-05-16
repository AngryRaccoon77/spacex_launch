import {Links} from "./links";
import {CrewMember} from "./crewMember";

export interface Launch {
  name: string;
  date_unix: number;
  date_utc: string;
  flight_number: number;
  rocket: string;
  launchpad: string;
  crew: string[];
  payloads: string[];
  success: boolean;
  links: Links;
}
