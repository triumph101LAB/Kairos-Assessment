export type EvenetCategory = 'Music' | 'Tech' |'Food' | 'Art' | 'Fitness' ;

export interface Organizer {
    name:string;
    email:string
}

export interface Event {
    id:string;
    name:string;
    description:string;
    category:EvenetCategory;
    date:string;
    venue:string;
    address:string;
    cover_image:string;
    price:number;
    currency:string;
    total_spots:number;
    spots_remaining:number;
    organizer:Organizer;
}