const UserRelation = require('../models/UserRelation');

exports.getRelations = async (req, res) => {
  const relations = await UserRelation.find({ ownerId: req.userId }).populate('relativeId', 'name email phone');
  res.json(relations);
};

exports.addOrUpdateRelation = async (req, res) => {
  const { relativeId, relationType, nickname, description } = req.body;
  const filter = { ownerId: req.userId, relativeId };
  const update = { relationType, nickname, description };
  const options = { upsert: true, new: true };
  const relation = await UserRelation.findOneAndUpdate(filter, update, options);
  res.json(relation);
};
