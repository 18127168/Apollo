import { gql } from "@apollo/client";

export const CREATE_STUDENT = gql`
    mutation CreateStudent($name: String!, $age: Int!, $rating: String!, $male: Boolean!) {
        createStudent(name: $name, age: $age, rating: $rating, male: $male) {
            name
            age
            rating
            male
        }
    }
`;