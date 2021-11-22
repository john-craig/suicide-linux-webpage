import React from "react";

import { MainContainer } from "./styles";
import Terminal from 'terminal-in-react'

import { sendCommand } from "../../services/functions";

const Template = () => {
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
              sendCommand(cmd).then(result => {
                var out = result['stdout'].split('\n')
                out.splice(0,4)
                out = out.join('\n')
                console.log(out)
                stdout(out)
              })
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
