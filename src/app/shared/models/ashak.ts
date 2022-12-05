export interface ashak {
    id: number,
    name: string,
    lastname: string,
    matricule: string,
    japname: string,
    role: string,
    age: number,
    planet: string,
    skills: {
        1 : {
            name: string,
            description: string
        },
        2 : {
            name: string,
            description: string
        }
    },
    quote: string,
    description: string
}