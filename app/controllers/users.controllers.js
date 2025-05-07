import bcrypt from "bcrypt";

class User {

    async register(email, username, password) {
        const hashPassword = bcrypt.hashSync(password, 10);

        const user = {
            email: email,
            username: username,
            password: hashPassword,
            telephone: telephone,
            role: "user",
        }

        //TODO Inséerer l'utilisateur dans la BDD
    }

    async login(email, password) {


        //TODO Récuperer les infos de l'utilisateur par l'email
        const user = {
            email: "sachaguerin.sg@gmail.com",
            username: "astria",
            password: "$2b$10$PBaw/vXk78xBK7Z/Cgtg2epPj/j1ScASNxAceQlUNDkP4rDOd4FCu",
            role: "admin"
        }

        const verification = bcrypt.compareSync(password, user.password);

        if (verification == true) {
            const payload = {
                id: 1,
                username: username,
                role: user.role
            };
            //FIXME Ajouter une limite au Token
            const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET)

            return token

        } else {
            return false
        }
    }

    getById(id) {
        //TODO Récuperer les informations de l'utilisateur dans la BDD
        const user = {
            "id": req.params["id"],
            "email": "sachaguerin.Sg@gmail.com",
            "username": "Astria",
            "telephone": "+33616283063",
            "status": "inactive"
        }
        if (user == null) {
            return false;
        }
        return user;
    }

    getWorkspaces(id) {
        //TODO Récuperer les workspaces dans la BDD
        const workspacesId = [1,2,3,4];

        //TODO Récupérer les informations des workspaces dans leur BDD respectives
        const workspaces = [
            {
                id: 1,
                "title": "Supinfo",
                // ...
            },
            {
                id: 1,
                "title": "Axelerance",
                // ...
            }
            // ...
        ];

        return workspaces;
    }

    profile_picture(id) {
        //TODO Récupérer le lien de l'image dans la BDD
        const profile_picture = "1746004637707-IMG_0190.jpg";
        return profile_picture;
    }

    update(email, username, password, telephone) {
        //TODO Récupérer les informations de l'utilisateur
        const currentUser = {
            "email": "sachaguerin.sg@gmail.com",
            "username": "Astria",
            "password": "$2b$10$PBaw/vXk78xBK7Z/Cgtg2epPj/j1ScASNxAceQlUNDkP4rDOd4FCu",
            "telephone": "+33616283063"
        }

        const updatedUser = {
            email: "",
            username: "",
            password:""
        };

        if (email == undefined || email == "" || email == null) {
            updatedUser.email = currentUser.email
        } else {
            updatedUser.email = email
        }
        if (username == undefined || username == "" || username == null) {
            updatedUser.username = currentUser.username
        }else {
            updatedUser.username = username;
        }
        if (telephone == undefined || telephone == "" || telephone == null) {
            updatedUser.telephone = currentUser.telephone
        }else {
            updatedUser.telephone = telephone;
        }
        if (password == undefined || password == '' || password == null) {
            updatedUser.password = currentUser.password
        } else {
            updatedUser.password = bcrypt.hashSync(password, 10);
        }

        //TODO Update les valeurs dans la BDD
    }

}

export default User;
