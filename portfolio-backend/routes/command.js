var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()

ssh.connect({
  host: process.env.BACKEND_IP,
  port: 24,
  username: 'visitor',
  privateKey: '/usr/src/app/visitor_id'
})

router.post("/", function(req, res) {
    const cmd = req.body.join(' ')

    ssh.execCommand(cmd, { cwd: '/home/visitor/', stream: 'stdout' }).then(function(result) {
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
