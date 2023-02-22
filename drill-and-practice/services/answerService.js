import { sql } from "../database/database.js";

const addAnswerOption = async (id, optionText, isCorrect) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${id}, ${optionText}, ${isCorrect})`;
};

const getAnswerOptionsByQuestionId = async (id) => {
    const ret = await sql`SELECT * FROM question_answer_options WHERE question_id = ${id}`;
    return ret;
};

const getAnswerOptionById = async(id) => {
    const ret = await sql`SELECT * FROM question_answer_options WHERE id=${id}`;
    return ret[0];
};

const getAnswerOptionByIDandQuestionID = async(id, qid) => {
    const ret = await sql`SELECT * FROM question_answer_options WHERE id=${id} AND question_id = ${qid}`;
    return ret[0];
}

const getCorrectOptions = async(qID) => {
    return await sql`SELECT * FROM question_answer_options WHERE is_correct = 'true' AND question_id = ${qID}`;
}

const deleteAnswerOptionsByQuestionId = async(questionID) => {
    await sql`DELETE FROM question_answer_options WHERE question_id=${questionID}`;
};

const deleteAnswerOptionById = async(id) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const saveAnswer = async(userID, questionID, optionID) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userID}, ${questionID}, ${optionID})`;
};

const deleteAnswersFromData = async(optionID) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id=${optionID}`;
};

const getStats = async() => {
    const ret = await sql`SELECT COUNT(id) FROM question_answers`;
    return ret[0].count;
}

export {
    addAnswerOption,
    deleteAnswerOptionById,
    deleteAnswerOptionsByQuestionId,
    deleteAnswersFromData,
    getAnswerOptionById,
    getAnswerOptionsByQuestionId,
    getAnswerOptionByIDandQuestionID,
    getCorrectOptions,
    saveAnswer,
    getStats,
};