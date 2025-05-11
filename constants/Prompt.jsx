import dedent from "dedent";

export default {
  IDEA: dedent`: As your are coaching teacher
    - User wants to learn about the topic
    - Generate 5-7 Course titles for study (Short)
    - Ensure it is related to the description
    - Output will be an ARRAY of Strings in JSON FORMAT only
    - Do not add any plain text in output`,
  COURSE: dedent`: As you are a coaching teacher
    - User wants to learn about all topics
    - Create 2 Courses with Course Name, Description, and 5-8 Chapters in each course
    - Ensure to add chapters with detailed explanations
    - Output in JSON FORMAT only`,
};
