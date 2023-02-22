import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";
import * as answerService from "../../services/answerService.js";

const showTopics = async ({ render }) => {
    const data = {
        topics: await topicsService.findAllTopics(),
    }
    render("quizTopics.eta", data);
}

const getRandomQuestion = async ({ params, response, render }) => {
    const topicID = params.id;
    let data = await questionsService.getRandomQuestionFromTopic(topicID);
    if (data) {
        response.redirect(`/quiz/${topicID}/questions/${data.id}`);
    } else {
        data = {
            errors: "This topic does not have any questions yet.",
        };
        render("quiz.eta", data);
    }
}

const showQuiz = async ({ params, render }) => {
    const data = {
        question: await questionsService.getQuestionByQuestionID(params.qid),
        options: await answerService.getAnswerOptionsByQuestionId(params.qid),
    };
    render("quiz.eta", data);
};

const showCorrect = async ({ params, render }) => {
    const data = {
        params: params,
    }
    render("correct.eta", data);
};

const showIncorrect = async ({ params, render }) => {
    const data = {
        correct: await answerService.getCorrectOptions(params.qid),
        params: params,
    }
    render("incorrect.eta", data);
};

const checkAnswer = async ({ params, response, state}) => {
    const questionID = params.qid;
    const optionID = params.oid;
    const userID = (await state.session.get("user")).id;
    await answerService.saveAnswer(userID, questionID, optionID);
    const data = await answerService.getAnswerOptionById(params.oid);
    if (data.is_correct) {
        response.redirect(`/quiz/${params.id}/questions/${params.qid}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/questions/${params.qid}/incorrect`);
    }
};

export { checkAnswer, getRandomQuestion, showQuiz, showTopics, showCorrect, showIncorrect };