const { students } = require("../ExampleData")

const resolvers = {
    Query: {
        getAllStudents() {
            return students;
        }
    },

    Mutation: {
        createStudent(parent, args, context, info) {
            const newStudent = args;
            students.push(newStudent);
            return newStudent;
        }
    }
}

module.exports = { resolvers }