import * as questionService from "../../services/questionsService.js";
import * as answerService from "../../services/answerService.js";

const getRandomQuestion = async ({ response }) => {
    const ret = await questionService.getRandomQuestion();
    if (ret === -1) {
        response.body = {};
    } else {
        const qID = ret.id;
        const text = ret.question_text;
        const temp = await answerService.getAnswerOptionsByQuestionId(qID);
        const answers = [];
        temp.forEach((element) => {
            const t_data = {
                optionId: element.id,
                optionText: element.option_text,
            };
            answers.push(t_data);
        });
        const data = {
            questionId: qID,
            questionText: text,
            answerOptions: answers,
        }
        response.body = data;
    };
}

const answerQuestion = async ({ response, request }) => {
    const body = await request.body({ type: "json" });
    const content = await body.value;
    const tmp = await answerService.getAnswerOptionByIDandQuestionID(content.optionId, content.questionId);
    if (tmp === undefined) {
        const ret = {correct: false};
        response.body = ret;
    } else {
        const ret = {correct: tmp.is_correct};
        response.body = ret;
    }
}

export { getRandomQuestion, answerQuestion };