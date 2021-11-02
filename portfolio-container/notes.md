Find the ID of Docker container with `sudo docker ps`

Execute `sudo docker inspect -f "{{ .NetworkSettings.IPAddress }}" container_name`
to find the IP, replacing "container_name" with the ID.

This provides a container IP to SSH into.

Still haven't figured out a good way to keep the docker container persistent...

To build:
`docker build -t portfolio .`

To run:
`docker run -it -l portfolio_container portfolio`

To run while mounting the .bashrc
`docker run -it -v $(pwd)/bash.bashrc:/home/visitor/.bashrc:ro portfolio`

To SSH into the container:
`ssh -o "StrictHostKeyChecking=no" -i $(pwd)/visitor_id visitor@172.17.0.4`

`ssh -o "StrictHostKeyChecking=no" -o PreferredAuthentications=password -o PubkeyAuthentication=no visitor@172.17.0.2`