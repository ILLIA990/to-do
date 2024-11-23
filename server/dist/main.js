"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = 3000;
        const app = (0, express_1.default)();
        //await mongoose.connect('mongodb+srv://ukrustacean:31E1cDx8YRDyxVZk@cluster0.bntnbmd.mongodb.net/?retryWrites=true&w=majority');
        yield mongoose_1.default.connect('mongodb+srv://illiamoiseyev71:mGkSkzeXLe6nW2n@cluster0.qnftlda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        const noteSchema = new mongoose_1.default.Schema({ note: String });
        const Note = mongoose_1.default.model('Note', noteSchema);
        app.use(express_1.default.text());
        app.use((0, cors_1.default)());
        app.get('/notes', (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const notes = (yield Note.find({}))
                .map(x => x.note);
            console.log([...notes]);
            res.status(200).json({ notes });
            res.end();
        }));
        app.post('/note', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const note = JSON.parse(req.body);
            const newNote = new Note(note);
            yield newNote.save();
            console.log('Saved new note!');
            res.status(200);
            res.end();
        }));
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
        app.on('SIGTERM', () => {
            mongoose_1.default.connection.close();
        });
        app.on('SIGKILL', () => {
            mongoose_1.default.connection.close();
        });
        app.on('SIGINT', () => {
            mongoose_1.default.connection.close();
        });
    });
}
main();
