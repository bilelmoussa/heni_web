import {makeProject, ProjectType} from '../entities';

type args = {
    Project: any,
    addNewProject: Function
}

const makeAddProject = ({Project, addNewProject}: args) => {
    return async (projectInfo: ProjectType) => {
        const newProject = await makeProject(projectInfo);

        const projectDb = new Project({
            name: newProject.name,
            description: newProject.description,
            images: newProject.images,
            createdOn: newProject.createdOn,
            modifiedOn: newProject.modifiedOn
        });
        
        return await addNewProject(projectDb);
    }
}

export default makeAddProject;