


class WorkspaceController {

    create(req, res) {

        const workspace = req.body;

        //TODO Ajouter le workspace dans la BDD

        try {
            console.log("Workspace added");
            res.status(200).sendText("Workspace created");
        } catch (e) {
            res.status(500).sendText(e);
        }

    }

}

export default WorkspaceController