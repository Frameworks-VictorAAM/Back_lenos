const commentSchema = new mongoose.Schema({
  username: { type: String, required: true }, // <--- Si esto es true, fallará el 400
  comentario: { type: String, required: true }, // <--- Ojo al nombre del campo
  date: { type: Date, default: Date.now }
});