const getAllUser = async(req, res, service) => {
    const admin = await service.getAllUser();
    res.send(admin);
}
const getUserById = async(req, res, service) => {
    const id = req.params.id;
    const admin = await service.getUserById(id);
    res.send(admin);
}
const createUser = async(req, res, service) => {
    const newAdmin = req.body;
    const admin = await service.createUser(newAdmin);
    res.send(admin);
}
const deleteUserById = async(req, res, service) => {
    const id = req.query.id;
    await service.deleteUserById(id);
    res.send({ id: id })
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    deleteUserById
}