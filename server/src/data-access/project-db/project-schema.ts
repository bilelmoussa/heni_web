import { Document, Schema, model, Model } from 'mongoose';

// Project schema
const projectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    images: [{src: {type: String, required: true}}],
    createdOn: {type: Number, required: true},
    modifiedOn: {type: Number, required: true}
});

type image = {
    src: string
}

interface ProjectSchema extends Document {
    name: string,
    description: string,
    images: image[],
    createdOn: number,
    modifiedOn: number,
}

const Project: Model<ProjectSchema> = model('Project', projectSchema);

export { Project };

export const addNewProject = async (projectInfo: ProjectSchema) => {
    return await projectInfo.save();
}

type getProjectsArgs = {
    skip:  string,
    limit: string,
}

export const getProjects = async ({skip = "0", limit = "4"}: getProjectsArgs) => {
    const parsedSkip = parseInt(skip);
    const parseLimit = parseInt(limit); 
  
    return await Project.find().sort({createdOn: -1}).skip(parsedSkip).limit(parseLimit);
};

export const deleteProject = async (id: string) => {
    return await Project.deleteOne({_id: id});
}