export const save = async (req, res, model) => {
    try {
        const objectId = await model.save(req.body)
        res.status(201)
            .set('Location', `${req.route.path}/${objectId}`)
            .send({ id: objectId })
    } catch(e) {
        res.status(500).send(e.message)
    }
}

export const findById = async (req, res, model) => {
    try {
        const object = await model.getOne('_id', req.params.id)
        object ? res.status(200).send(object) : res.status(404).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
}

export const listAll = async (res, model) => 
    res.status(200).send(await model.getAll())

export const fullUpdate = async (req, res, model) => {
    try {
        const object = await model.replace(req.params.id, req.body)
        object ? res.status(204).send() : res.status(404).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
}