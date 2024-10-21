import LocalSource from "@/datasource/controller";

async function getAllUsersFromLocalSource() {
    return LocalSource.getAllUsers()
}

async function getAllUsers() {
    let response = null;
    try {
        response = await getAllUsersFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des utilisateurs'  }
    }
    return response
}

export default {
    getAllUsers
}