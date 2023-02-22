import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
};

const showRegisterPage = ({ render }) => {
    render("register.eta");
};

const showLoginPage = ({ render }) => {
    render("login.eta");
};

const addUser = async ({ request, response, render }) => {
    const body = await request.body({ type: "form"});
    const params = await body.value;
    const data = {
        email : params.get("email"),
        password : params.get("password"),
    };
    const existing = await userService.findUser(data.email);
    
    const [passes, errors] = await validasaur.validate(data, validationRules);
    if (passes) {
        if (existing.length > 0 ){
            data.errors = { email: { required: "email is already reserved"}};
            render("register.eta", data);
        } else {
            const hash = await bcrypt.hash(data.password);
            await userService.createUser(data.email, hash);
            response.redirect("/auth/login");
        };
    } else {
        data.errors = errors;
        render("register.eta", data);
    }
}

const authenticate = async ({ request, response, render, state }) => {
    const body = request.body();
    const params = await body.value;
    const email = params.get("email");
    const password = params.get("password");

    const existing = await userService.findUser(email);
    if (existing.length != 1){
        render("login.eta", {error: "This user does not exist."});
        return;
    }
    const user = existing[0];
    const passwordCorrect = await bcrypt.compare(password, user.password)
    if (!passwordCorrect) {
        render("login.eta", {error: "Email and password do not match."});
        return;
    }
    await state.session.set("authenticated", true);
    await state.session.set("user", {
        id: user.id,
        email: user.email,
        admin: user.admin,
    });
    response.redirect("/topics");
}


export { addUser, authenticate, showLoginPage, showRegisterPage };