import { BadRequest } from '../../errors'

type imageType = {
    src: string
}

export type ProjectType = {
    name: string;
    description: string;
    images: imageType[];
    createdOn: number;
    modifiedOn: number;
}

export class Project {
    public name: string;
    public description: string;
    public images: imageType[]
    public createdOn: number;
    public modifiedOn: number;
    static error: string;


    constructor(
        project: ProjectType,
        projectValidate: Function
    ) {
        this.name = project.name;
        this.description = project.description;
        this.images = project.images;
        this.createdOn = project.createdOn;
        this.modifiedOn = project.modifiedOn;

        Project.error = projectValidate({
            name: this.name,
            description: this.description,
            images: this.images,
            createdOn: this.createdOn,
            modifiedOn: this.modifiedOn
        });

        if (Project.error) throw new BadRequest(Project.error);
    }


}