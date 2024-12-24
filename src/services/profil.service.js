import LocalSource from "@/datasource/controller";

async function getAllUsersFromLocalSource() {
    return LocalSource.getAllUsers()
}
async function loginSiteFromLocalSource(data){
    return LocalSource.loginSite(data)
}

async function getAllUsers() {
    let response;
    try {
        response = await getAllUsersFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des utilisateurs'  }
    }
    return response
}

async function loginSite(data) {
    let response;
    try {
        response = await loginSiteFromLocalSource(data)
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
    }
    return response
}


export default {
    getAllUsers,
    loginSite
}