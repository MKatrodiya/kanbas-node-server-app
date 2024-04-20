import model from "./model.js";

export const findAllModules = (courseId) => model.find();

export const createModule = (courseId, module) => {
  delete module._id;
  module.course = courseId;
  return model.create(module);
};

export const updateModule = (moduleId, module) => {
  return model.updateOne({ _id: moduleId }, { $set: module });
};

export const deleteModule = (moduleId) => {
  return model.deleteOne({ _id: moduleId });
};
