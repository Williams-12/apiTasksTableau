const express = require(`express`);
const app = express();
const port = 3000;

const tasks = [];

app.use(express.json());

let idCounter = 1;

// Route pour ajouter les taches
app.post(`/tasks`, (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: `Le title du tache est obligatoire` });
    }
    const newTask = { id: idCounter++, title };
    tasks.push(newTask);
    res.status(200).json(newTask);
})

// Route pour lire les taches avec (GET/tasks)
app.get(`/tasks`, (req, res) => {
    res.json(tasks);
});

// Afficher une tâche spécifique (GET /tasks/:id)

app.get(`/tasks/:id`, (req, res) => {
    const task = tasks.find(tag => tag.id === parseInt(req.params.id));
    if (!task) {
        return res.status(400).json({ message: `Tache non trouvé!` })
    }
    res.json(task);
})

// Modifier une tâche (PUT /tasks/:id)
app.put(`/tasks/:id`, (req, res) => {
    const task = tasks.find(tag => tag.id === parseInt(req.params.id));
    if (!task) {
        return res.status(400).json({ message: `Tache non trouvé!` })
    }
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: `vous devez ajouter une tache` });
    }
    task.title = title;
    res.json(task);
})

// Supprimer une tâche (DELETE /tasks/:id)
app.delete(`/tasks/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(tag => tag.id === id)

    // on va d'abord verifier si la tache existe
    if (taskIndex === -1) {
        return res.status(400).json({ message: `Tache non trouvé!` });
    }
    tasks.splice(taskIndex, 1)
    res.json({ message: `Tache ${id} supprimée avec succès` });

    // je reinitialise le compteur si le tableau est vide
    if (tasks.length === 0) {
        idCounter = 1
    }


});

// Je demarre le serveur
app.listen(port, () => {
    console.log(`Votre serveur est en cours d'execution sur http://localhost:${port}`);

})