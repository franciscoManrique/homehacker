export class House{
    id?:string; //?no estara cuando yo lo haga aqui pero si cuando lo reciba
    name: string;
    owner: string;
    price: number;
    start: Date;
    end: Date;
    photos?: Array<string>;
    description:string;
    location: string;
    people: Array<string>;
    amenities: Array<string>;
}
