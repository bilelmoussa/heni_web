import {Project, ProjectType} from './project';
import projectSchema from './project-schema';
import validateSchema from '../../shared/validator';

const checkProjectValidation = validateSchema(projectSchema);

const makeProject = async (project: ProjectType) => new Project(
    project,
    checkProjectValidation
)

export{makeProject, ProjectType};