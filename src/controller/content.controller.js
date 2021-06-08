const getAllContent = async(req, res, service) => {
    const content = await service.getAllContent();
    res.send(content);
}
const getContentById = async(req, res, service) => {
    const id = req.params.id;
    const content = await service.getContentById(id);
    res.send(content);
}
const createContent = async(req, res, service) => {
    const newContent = req.body;
    const content = await service.createContent(newContent);
    res.send(content);
}
const updateContent = async(req, res, service) => {
    const newContent = req.body;
    const content = await service.updateContent(newContent);
    res.send(content)
}
const deleteContentById = async(req, res, service) => {
    const id = req.query.id;
    await service.deleteContentById(id);
    res.send({ id: id })
}

module.exports = {
    getAllContent,
    getContentById,
    createContent,
    updateContent,
    deleteContentById
}