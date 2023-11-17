export interface Building {
    id: number;
    building_name: string;
    building_street: string;
    building_number: string;
    building_ort: string;
    building_plz: number;
    building_country: string;
    building_image: string;
    floor_ids: number[];
    room_ids: number[];
}
