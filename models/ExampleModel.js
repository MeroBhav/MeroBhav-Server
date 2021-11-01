/**
 * * Defining Schema for MongoDB
 * * NOTE: Naming indexes, variables, documents are custom i.e. no constant rules to apply
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ExampleSchema = new Schema({
  /**
   * * Whether you define {_id} or not it'll be generated automatically in MongoDB
   * * but it's good practice for using custom {_id} for multiple databases sometimes
   * * better for applying relations since MongoDB is {Non-Relational Database}.
   */
  _id: ObjectId,

  /**
   * * There are multiple parameters for database index e.g. {require} so if there is
   * * no need for {parameters} then simply the same message {index} could be as follows
   * *{
   * *   message: String
   * *}
   */
  message: {
    type: String,
    require: [true, "Message is required!"],
  },
  created_at: {
    type: Date,
    /**
     * * Default value can be assinged to {index}
     */
    default: Date.now(),
  },
  updated_at: Date,
});

/**
 * * mongoose.model("document name", SchemaName) is used to assing schema model to a document
 * * document name will automatically convert tp plurals i.e. example {document} => {example_documents}
 */
module.exports = mongoose.model("example_document", ExampleSchema);
/**
 * * TODO: Create a different Schema and Apply CRUD opertaion i.e. CREATE READ UPDATE DELETE
 */
