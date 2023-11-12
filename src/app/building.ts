export interface Building {
    id: number;
    building_streetname: string;
    building_number: string;
    building_ort: string;
    building_plz: string;
    building_country: string;
    building_image: string;
    floor_ids: number[];
    room_ids: number[];
}
