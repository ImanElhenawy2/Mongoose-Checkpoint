const personsRouter = require("express").Router();
const PersonModel = require("../Models/PersonModel");

personsRouter
    .get("/", async (req, res) => {
        try {
            let persons = await PersonModel.find();
            res.status(200).send(persons);
        } catch (e) {
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .get("/:id", async (req, res) => {
        try {
            const personId = req.params.id;

            const person = await PersonModel.findById(personId);

            res.status(200).send({ person: person });
        } catch (e) {
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .get("/find-name", async (req, res) => {
        try {
            const person = await PersonModel.findByName({name: req.body.name});

            res.status(200).send(resBody);
        } catch (e) {
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .post("/", async (req, res) => {
        try {
            let person = new PersonModel({
                age: req.body.age,
                name: req.body.name,
            });

            let resBody = await person.save();

            res.status(200).send(resBody);
            console.log(req.body);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .post("/create-many", async (req, res) => {
        try {
            await PersonModel.create(req.body)

            res.status(200).send("created");
            console.log(req.body);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .put("/:id", async (req, res) => {
        try {
            
            await PersonModel.findOneAndReplace(
                { _id: req.params.id },
                req.body
            );
            res.status(200).send({ _id: req.params.id, ...req.body });
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .put("/:id/add-favoritFood", async (req, res) => {
        try {
            
            const person = await PersonModel.findById( req.params.id );

            person.favoriteFood.push(req.body.item);
            const result = await person.save();

            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .delete("/:id/remove-one", async (req, res) => {
        try {
            await PersonModel.deleteOne({ _id: req.params.id }, req.body);
            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    }).delete("/remove-many", async (req, res) => {
        try {
            await PersonModel.deleteMany({name: req.body.name});
            res.status(200).send(deleted);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    });

module.exports = personsRouter;
