import * as questionsService from "../../services/questionsService.js";
import * as answerService from "../../services/answerService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    text: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ params, request, response, render, state }) => {
    const topicID = params.id;
    const id = (await state.session.get("user")).id;
    const body = await request.body({ type: "form" });
    const formParams = await body.value;
    const qData = {
        id: topicID,
        text: formParams.get("question_text"),
    };
    const [passes, errors] = await validasaur.validate(qData, validationRules);
    if (passes) {
        await questionsService.addQuestion(id, topicID, qData.text);
        response.redirect(`/topics/${topicID}`);
    } else {
        qData.errors = errors;
        qData.questions = await questionsService.getQuestionsByTopicId(topicID);
        render("questions.eta", qData);
    }
};

const showQuestions = async ({ params, render }) => {
    const id = params.id;
    const data = {
        id,
        questions: await questionsService.getQuestionsByTopicId(id),
        topic: await topicsService.getTopicById(id),
    };
    render("questions.eta", data);
};

const showQuestion = async ({ params, render }) => {
    const questionID = params.qid;
    const data = {
        question: await questionsService.getQuestionByQuestionID(questionID),
        options: await answerService.getAnswerOptionsByQuestionId(questionID),
    };
    render("question.eta", data);
};

const removeQuestion = async ({ response, params }) => {
    const qid = params.qid;
    await questionsService.deleteQuestion(qid);
    response.redirect(`/topics/${params.id}`);
};

export { addQuestion, removeQuestion, showQuestion, showQuestions };
