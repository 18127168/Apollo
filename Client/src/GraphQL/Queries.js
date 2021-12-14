import { gql } from "@apollo/client";

export const LOAD_STUDENT = gql`
    query ExampleQuery {
    getAllStudents {
        name
        age
        rating
        male
    }
    }
`;
