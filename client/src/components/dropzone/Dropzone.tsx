import React, { Component } from 'react';
import './Dropzone.scss';
import Backup from '@material-ui/icons/Backup';

interface Props {
    disabled: any
    onFilesAdded: any
}

class Dropzone extends Component<Props> {
    state = {
        hightlight: false,
    }
    
    private fileInputRef = React.createRef<HTMLInputElement>();

    fileListToArray = (list: any) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
          array.push(list.item(i));
        }
        return array;
    }

    openFileDialog = () => {
        if (this.props.disabled) return;
        if(this.fileInputRef.current){
            this.fileInputRef.current.click();
        }
    }

    onFilesAdded = (evt: any) => {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
          this.props.onFilesAdded(array);
        }
    }

    onDragOver = (evt: any) => {
        evt.preventDefault();
      
        if (this.props.disabled) return;
      
        this.setState({ hightlight: true });
    }

    onDragLeave = () => {
        this.setState({ hightlight: false });
    }

    onDrop = (event: any) => {
        event.preventDefault();
      
        if (this.props.disabled) return;
      
        const files = event.dataTransfer.files;

        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
          this.props.onFilesAdded(array);
        }
        
        this.setState({ hightlight: false });
    }

    render() {
        return (
            <div 
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <Backup
                    className="Icon" 
                />
                <input
                    onChange={this.onFilesAdded}
                    className="FileInput"
                    ref={this.fileInputRef}
                    value={""}
                    type="file"
                    multiple
                />
                <span>Upload Files</span>
            </div>
        )
    }
}

export default Dropzone;
