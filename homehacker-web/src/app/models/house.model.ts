export class House{
    id?:string; //?no estara cuando yo lo haga aqui pero si cuando lo reciba
    name: string;
    owner: string;
    price: number;
    start: Date; 
    end: Date;
    photos?: Array<File> = [];
    description:string;
    people: number;
    kids: number;
    amenities?: Array<string>;
    // location: {
    //     latitude: string,
    //     longitude: string
    // };

    // public asFormData(): FormData {
    //     const data = new FormData();
    
    //     data.append('brand', this.brand);
    //     data.append('name', this.name);
    //     for (const spec of this.specs) {
    //         data.append('specs', spec);
    //     }
    //     data.append('image', this.imageFile ? this.imageFile : this.image);
    
    //     return data;
    // }
}
