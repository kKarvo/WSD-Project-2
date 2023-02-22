import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";

const validationRules =  {
    text: [validasaur.required, validasaur.minLength(1)],
}

const addOption = async ({ params, request, response, render }) => {
    const questionID = params.qid;
    const body = await request.body({ type: "form" });
    const formParams = await body.value;
    const check = formParams.get("is_correct");
    let isCorrect = false;
    if (check === "on") {
        isCorrect = true;
    }
    const data = {
        text: formParams.get("option_text"),
        isCorrect: isCorrect,
    };
    const [passes, errors] = await validasaur.validate(data, validationRules);
    if (passes) {
        await answerService.addAnswerOption(questionID, data.text, data.isCorrect);
        response.redirect(`/topics/${params.id}/questions/${params.qid}`);
    } else {
        data.errors = errors;
        data.question = await questionsService.getQuestionByQuestionID(questionID);
        data.options = await answerService.getAnswerOptionsByQuestionId(questionID);
        render("question.eta", data);
    };
};

const removeOption = async ({ params, response }) => {
    await answerService.deleteAnswersFromData(params.oid);
    await answerService.deleteAnswerOptionById(params.oid);
    response.redirect(`/topics/${params.id}/questions/${params.qid}`);
}

export { addOption, removeOption };