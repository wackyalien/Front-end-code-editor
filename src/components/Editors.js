import React, {Component} from 'react';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

import './Editors.css';

export default class Editor extends Component{
    constructor(){
        super()
        this.state={
            content:"",
            // theme:"monokai",
            srcDoc:""
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.content === nextState.content) {
          return false
        } else {
          return true;
        }
    }

    downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([this.state.content],    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "download.txt";
        document.body.appendChild(element);
        element.click();
    }

    handleOnChange = () =>{
        this.setState({
            srcDoc:this.state.content
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.srcDoc === nextState.srcDoc) {
          return false
        }
        else{
            return true
        }
    }
    
    render(){
        return(
            <div>
                <AceEditor
                    width="49.5%"
                    height="540px"
                    mode="javascript"
                    theme="monokai"
                    className="aceeditor"
                    onChange = {(newValue) => {
                        this.setState({
                            content: newValue
                        });
                      }}
                />
                <iframe  className="frame" srcDoc={this.state.srcDoc} />
                <button className="run-btn" onClick={this.handleOnChange}>Run</button>
                <button className="download-btn" onClick={this.downloadTxtFile}>Download</button>
                {/* <button className="theme-btn" onClick={this.handleTheme}>Change theme</button> */}
            </div>
        )
    }
}