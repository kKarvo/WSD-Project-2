import { sql } from "../database/database.js";

const addQuestion = async (userID, topicID, text) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userID}, ${topicID}, ${text})`;
};

const deleteQuestion = async (questionID) => {
    await sql`DELETE FROM questions WHERE id = ${questionID}`;
};

const deleteQuestionByTopicId = async(topicID) => {
    await sql`DELETE FROM questions WHERE topic_id=${topicID}`;
};

const getQuestionsByTopicId = async (id) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${id}`;
};

const getQuestionByQuestionID = async (id) => {
    const ret = await sql`SELECT * FROM questions WHERE id = ${id}`;
    return ret[0];
};

const getRandomQuestionFromTopic = async (topicID) => {
    const ret = await sql`SELECT * FROM questions WHERE topic_id = ${topicID} ORDER BY RANDOM() LIMIT 1`;
    return ret[0];
};

const getRandomQuestion = async () => {
    const ret = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
    if (ret.length != 0) {
        return ret[0];
    } else {
        return -1;
    }
};

const getStats = async() => {
    const ret = await sql`SELECT COUNT(id) FROM questions`;
    return ret[0].count;
}


export {
    addQuestion,
    deleteQuestion,
    deleteQuestionByTopicId,
    getRandomQuestion,
    getRandomQuestionFromTopic,
    getQuestionByQuestionID,
    getQuestionsByTopicId,
    getStats,
};
