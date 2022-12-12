export interface ashak {
    id: number,
    name: string,
    lastname: string,
    matricule: string,
    japname: string,
    role: string,
    age: number,
    sex: string,
    eye: string,
    ulti : {
        name : string,
        description: string,
        action: string
    },
    planet: string,
    skills: {
        first : {
            name: string,
            description: string,
            action: string
        },
        second : {
            name: string,
            description: string,
            action: string
        }
    },
    quote: string,
    description: string
}