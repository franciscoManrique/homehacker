export class House{
    id?:string; //?no estara cuando yo lo cree pero si cuando lo reciba
    name: string;
    owner?: string;
    price: number;
    start: Date; 
    end: Date;
    photos: Array<File> = []; 
    description:string;
    people: number;
    amenities?: Array<string> = [];
    
    longitude?: string;
    latitude?: string;
    
    // location: {
    //     latitude: string,
    //     longitude: string
    // };
    
    
    
    public asFormData(): FormData{
        const data = new FormData();
        
        data.append('name', this.name);
        data.append('price', (this.price).toString());
        data.append('start', (this.start).toString());
        data.append('end', (this.end).toString());
        data.append('description', this.description);
        data.append('people', (this.people).toString());
        
        
        data.append('longitude', this.longitude);
        data.append('latitude', this.latitude);
        // data.append('location', this.location);
        
        for (const amenity of this.amenities) {
            data.append('amenities', amenity);
        }
        
        for (const photo of this.photos) {
            data.append('photos', photo);
        }
        return data;
    }
    
}
