import React, { Component } from 'react';
import './Upload.scss';
import Delete from '@material-ui/icons/Delete';
import Dropzone from '../dropzone/Dropzone'
import IconButton from '@material-ui/core/IconButton';

const RenderErrMsg = (ErrorMsg: string) =>{
    const err = String(ErrorMsg);
    if(err.trim().length > 0){
      return(
        <div className="errMsg">
            <p style={{color: "#fff", textTransform: "uppercase", fontSize: 12, letterSpacing: 1}}>{ErrorMsg}</p>
        </div>
      )
    }else{
      return null;
    }
}

interface Props {
    onFilesAdded: any
    handeleDeleteFile: any
    files: any[]
}

interface State {
    uploading: boolean
    uploadProgress: any
    successfullUploaded: boolean
    errorMsg: string
}

let errTimeOut: any;

class Upload extends Component<Props, State> {
    state:State  = {
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false,
        errorMsg: ''
    }

    setErrorTimeOut() {
      errTimeOut = setTimeout(() => {
        this.setState({errorMsg: ""});
      }, 10000);
    }

    stopErrorTimeOut() {
      clearTimeout(errTimeOut);
    }

    onFilesAdded = (files: any) => {
        this.stopErrorTimeOut();

        this.setState({errorMsg: ''});

        let FilesNmb =  files.length + this.props.files.length;
        let maxFileUploads = false;
        let FileToDelete: any[] = [];

  
        if(FilesNmb > 3){
            maxFileUploads = true;
            this.setState({errorMsg: "Max Files Number is 3"});
            this.setErrorTimeOut()
        }
  
  
        if(!maxFileUploads){
          let key_id  = 0;
          if(this.props.files.length === 0){
            key_id = this.props.files.length;
          }else{
            key_id = this.props.files[this.props.files.length - 1].id +1;
          }
    
  
          files.forEach((file: any, i: number)=>{
            file.id = key_id;
            key_id++;
            const filetypes = /jpeg|jpg|png|gif/;
            const name = filetypes.test(file.name.toLowerCase());
            const type = filetypes.test(file.type.toLowerCase());
  
            if(!name && !type){
              this.setState({errorMsg: "Images Only !"})
              FileToDelete.push(file);
              this.setErrorTimeOut()
            }
  
            if(file.size > 1000000){
              this.setState({errorMsg: "Height Size File !"});
              FileToDelete.push(file);
              this.setErrorTimeOut();
            }
  
            this.props.files.forEach((f: any) => {
              if(file.name === f.name && file.lastModified === f.lastModified && file.size === f.size && file.type === f.type ){
                  FileToDelete.push(file);
                  this.setState({errorMsg: "File Aleardy Exist !"});
                  this.setErrorTimeOut();  
              }
            })
            
          });
  
          
          if(FileToDelete.length > 0){
            FileToDelete.forEach((F)=>{
              let index = files.indexOf(F)
              files.splice(index, 1);
            })
          }

          if (this.props.onFilesAdded) {
            this.props.onFilesAdded(files);
          }
  
        }
       
      }
  
  
      handeleDeleteFile = (target: any) => () => {
        this.stopErrorTimeOut();
  
        if(this.props.handeleDeleteFile){
          this.props.handeleDeleteFile(target);
        }

        this.setState({errorMsg: ""});
      }

    render() {
        const { errorMsg } = this.state;

        return (
            <div className="Upload">
            <span className="Title">Upload Files</span>
            <div className="Content">
                <Dropzone
                    onFilesAdded={this.onFilesAdded}
                    disabled={this.state.uploading || this.state.successfullUploaded}
                />
                <div className="Files" >
                  {RenderErrMsg(errorMsg)}
                    {this.props.files.map((file, i) => {
                        return (
                            <div key={file.id} className="Row">
                            <IconButton className="delete_file" onClick={this.handeleDeleteFile(file)}><Delete/></IconButton>
                            <span className="Filename">{file.name}</span>
                            <div className="ImageContainer">
                                <img 
                                    alt={file.name}
                                    src={URL.createObjectURL(file)}
                                    width="250px"
                                    height="auto"
                                />
                            </div>  
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        )
    }
}

export default Upload
