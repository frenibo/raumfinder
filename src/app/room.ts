

export interface Room {
    id: number;
    name: string;
    floor: string;
    building: string;
    building_id: number;
    favorite: boolean;
    unlock: boolean;
    type: string;
    seats: number;
    beamer: boolean;
    beamer_connectors: string[];
    whiteboard: boolean;
    pcs: number;
}
