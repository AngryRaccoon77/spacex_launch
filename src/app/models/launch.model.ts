export interface Launch {
    name: string;
    date_utc: Date;
    date_local: string;
    date_unix: number;
    success: boolean;
    rocket: string;
    //crew: CrewMember[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flight_number: number;
    //cores: Core[];
}
