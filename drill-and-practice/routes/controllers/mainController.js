import * as topicsService from "../../services/topicsService.js"
import * as answerService from "../../services/answerService.js"
import * as questionsService from "../../services/questionsService.js"

const showMain = async ({ render }) => {
    const data = {
        tStats: await topicsService.getStats(),
        qStats: await questionsService.getStats(),
        aStats: await answerService.getStats(),
    }
    render("main.eta", data);
};

export { showMain };
