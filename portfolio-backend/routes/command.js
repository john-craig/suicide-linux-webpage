var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()
var cwd = '/home/visitor/'

ssh.connect({
  //host: process.env.CONTAINER_IP,
  host: "linux",
  // port: 2022,
  username: 'visitor',
  password: 'visitor'
  //privateKey: '/usr/src/app/visitor_id',
  // algorithms: {
  //   serverHostKey: 'ecdsa-sha2-nistp256'
  // }
  // localPort: 2023
}).then(ssh => {
  console.log("SSH Connection Status:", ssh.isConnected())
})

//console.log("Container IP:", process.env.CONTAINER_IP)


router.post("/", function(req, res) {
    const cmd = req.body.join(' ')

    ssh.execCommand(cmd, { cwd: cwd, stream: 'stdout' }).then(function(result) {
        res.status(200).send(
          {
            "status": "Successful",
            "stdout": result['stdout']
          }
        )
    })

    if (req.body[0] == 'cd'){
      //absolute path
      if (req.body[1].charAt(0) == '/'){
        cwd = req.body[1]
      } else if(req.body[1] == ".."){
        var tmp = cwd.split('/')
        tmp.pop()
        cwd = tmp.join('/')
      } else {
        cwd = cwd + "/" + req.body[1]
      }

      console.log(cwd)
    }
})

//export this router to use in our index.js
module.exports = router;
