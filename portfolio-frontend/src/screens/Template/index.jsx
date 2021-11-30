import React from "react";

import { MainContainer } from "./styles";
import Terminal from 'terminal-in-react'

import { sendCommand } from "../../services/functions";

const Template = () => {
  var cwd = "/home/visitor";

  function handleCommand(cmd, stdout){
    sendCommand(cmd, cwd).then(result => {
      var out = result['stdout'].split('\n')
      out.splice(0,4)
      out = out.join('\n')
      console.log(out)

      //Handle change directory
      if(cmd[0] == "cd"){
        cwd = handleChangeDirectory(cmd, cwd, out)
      }

      stdout(out)
    })
  }

  function handleChangeDirectory(cmd, cwd, out){
    //Check to see if the directory change failed

    //If not, apply the directory change to
    //the 'cwd' variable
    if(cmd[1] == ".."){
      cwd = cwd.substring(0, cwd.lastIndexOf('/'))
    }
    else if([1] == "."){
      //Do nothing
    }
    else if(cmd[1].charAt(0) == '/'){
      cwd = cmd[1]
    }
    else {
      cwd = cwd + '/' + cmd[1]
    }

    console.log(cwd);

    return cwd
  }

  return (
    <MainContainer>
    <div
      style={{
        width: "80vw",
        height: "60vh"
      }}
    >
       <Terminal
          color='green'
          backgroundColor='black'
          barColor='black'
          commandPassThrough={
            (cmd, stdout) => {
              handleCommand(cmd, stdout);
            }
          }
          hideTopBar
          startState="maximised"
      />
    </div>
    </MainContainer>
  );
};

export default Template;
