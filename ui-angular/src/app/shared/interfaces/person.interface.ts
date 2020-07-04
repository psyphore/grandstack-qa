export interface Person {
    id: string | any;
    firstname: string;
    lastname: string;
    username: string;
    title: string;
    email: string;
    avatar: {
        sha256: string;
        url: string;
        mime: string;
        ext: string;
    };
    knownAs: string;
    bio: string;
}

export interface PersonResponse {
    person: Person;
}

export interface PeopleResponse {
    people: Person[];
}