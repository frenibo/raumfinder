export interface Building {
    id: number;
    name: string;
    street: string;
    street_number: string;
    ort: string;
    plz: number;
    country: string;
    image: string;
    floor_ids: number[];
    room_ids: number[];
}
