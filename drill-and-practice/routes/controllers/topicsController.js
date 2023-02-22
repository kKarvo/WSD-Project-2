import * as topicsService from "../../services/topicsService.js";
import * as questionsService from "../../services/questionsService.js";
import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const addTopic = async ({ request, response, state, render }) => {
    const id = (await state.session.get("user")).id
    const admin = (await state.session.get("user")).admin
    const body = await request.body({ type: "form" });
    const params = await body.value;
    const data = {
        admin: admin,
        name: params.get("name"),
    }
    const [passes, errors] = await validasaur.validate(data, validationRules);
    if (passes && admin) {
        await topicsService.createTopic(params.get("name"), id);
        response.redirect("/topics");
    } else {
        data.errors = errors;
        if (!admin) {
            data.errors = { name: {required: "You are not an admin"}};
        }
        data.topics = await topicsService.findAllTopics();
        render("topics.eta", data);        
    };
};

const showTopics = async ({ render, state }) => {
    const data = {
        admin: (await state.session.get("user")).admin,
        topics: await topicsService.findAllTopics(),
    };
    render("topics.eta", data);
};

const removeTopic = async ({ response, params }) => {
    const id = params.id;
    const questions = await questionsService.getQuestionsByTopicId(params.id);

    for (let elem of questions) {
        const option = await answerService.getAnswerOptionsByQuestionId(elem.id);
        for (let element of option) {
            await answerService.deleteAnswersFromData(element.id);
        };
        await answerService.deleteAnswerOptionsByQuestionId(elem.id);
    };
    await questionsService.deleteQuestionByTopicId(id);
    await topicsService.deleteTopic(id);
    response.redirect("/topics");
};

export { addTopic, removeTopic, showTopics };
