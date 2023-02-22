import { sql } from "../database/database.js";

const findAllTopics = async () => {
    return await sql`SELECT * FROM topics ORDER BY name`;
};

const createTopic = async (name, userID) => {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${userID})`;
};

const deleteTopic = async (id) => {
    await sql`DELETE FROM topics WHERE id = ${id}`;
};

const getTopicById = async (id) => {
    const ret = await sql`SELECT * FROM topics WHERE id = ${id}`;
    return ret[0];
}

const getStats = async () => {
    const ret =  await sql`SELECT COUNT(id) FROM TOPICS`;
    return ret[0].count;
}

export { createTopic, deleteTopic, findAllTopics, getTopicById, getStats };
