import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

async function main() {
    const PORT = 3000;
    const app = express();
    await mongoose.connect('mongodb+srv://illiamoiseyev71:<db_password>@cluster0.qnftlda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const noteSchema = new mongoose.Schema({ note: String });
    const Note = mongoose.model('Note', noteSchema);

    app.use(express.text());
    app.use(cors());

    app.get('/notes', async (_req, res) => {
        const notes = (await Note.find({}))
            .map(x => x.note!);
        console.log([...notes]);

        res.status(200).json({ notes });
        res.end();
    });

    app.post('/note', async (req, res) => {
        const note: { note: string } = JSON.parse(req.body);
        const newNote = new Note(note);

        await newNote.save();
        console.log('Saved new note!');

        res.status(200);
        res.end();
    });

    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });

    app.on('SIGTERM', () => {
        mongoose.connection.close();
    });

    app.on('SIGKILL', () => {
        mongoose.connection.close();
    });

    app.on('SIGINT', () => {
        mongoose.connection.close();
    });
}

main();