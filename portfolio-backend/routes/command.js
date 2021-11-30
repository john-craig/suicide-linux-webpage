var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()

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
router.get("/", function(req, res) {
  res.send("Success")
})

router.post("/", function(req, res) {
  console.log(req.body)

    const cmd = req.body['cmd'].join(' ')
    const cwd = req.body['cwd']

    ssh.execCommand(cmd, { cwd: cwd, stream: 'stdout' }).then(function(result) {
        res.status(200).send(
          {
            "status": "Successful",
            "stdout": result['stdout']
          }
        )
    })
})

//export this router to use in our index.js
module.exports = router;
