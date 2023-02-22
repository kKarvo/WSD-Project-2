import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as answerController from "./controllers/answerController.js";
import * as userController from "./controllers/userController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicsController.showTopics);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.removeTopic);
router.get("/topics/:id", questionsController.showQuestions);
router.post("/topics/:id/questions", questionsController.addQuestion);
router.get("/topics/:id/questions/:qid", questionsController.showQuestion);
router.post("/topics/:id/questions/:qid/delete", questionsController.removeQuestion);
router.post("/topics/:id/questions/:qid/options", answerController.addOption);
router.post("/topics/:id/questions/:qid/options/:oid/delete", answerController.removeOption);
router.get("/auth/register", userController.showRegisterPage);
router.post("/auth/register", userController.addUser);
router.get("/auth/login", userController.showLoginPage);
router.post("/auth/login", userController.authenticate);
router.get("/quiz", quizController.showTopics);
router.get("/quiz/:id", quizController.getRandomQuestion);
router.get("/quiz/:id/questions/:qid", quizController.showQuiz);
router.post("/quiz/:id/questions/:qid/options/:oid", quizController.checkAnswer);
router.get("/quiz/:id/questions/:qid/correct", quizController.showCorrect);
router.get("/quiz/:id/questions/:qid/incorrect", quizController.showIncorrect);
router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.answerQuestion);

export { router };