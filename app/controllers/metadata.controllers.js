

class metadata {

    setMetadata(user_id, key, value) {
        try {
            //TODO Enregistrer dans la base
            return true
        } catch (e) {
            return e;
        }
    }

    getMetadata(user_id, key) {
        try {
            //TODO Recupèrer la value
            const metadata = true;
            return true;
        } catch (e) {
            return e
        }
    }

    updateMetadata(user_id, key, new_value) {
        try {
            //TODO Recuperer la value
            const metadata = true;
            //TODO Renvoyer la value
            return true;
        } catch(e) {
            return e;
        }
    }

}
