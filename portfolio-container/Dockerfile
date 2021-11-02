FROM ubuntu:latest

RUN apt -o Acquire::Max-FutureTime=86400 update && \
    apt-get install -y openssl curl openssh-server sudo && \
    apt-get clean


# Configure the SSH daemon
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config

# Create the visitor user and configure their settings
RUN useradd -rm -s /bin/bash -g root -G sudo -u 1000 visitor && \
    echo 'visitor:visitor' | chpasswd

RUN echo "visitor ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers

# Add SSH keys to the user directory
RUN mkdir /home/visitor/.ssh

# Start the SSH server`
RUN service ssh start

#Copy in the authorized key
COPY visitor_id.pub /home/visitor/.ssh/authorized_keys

#Create a volume for the user's bashrc
VOLUME ["/home/visitor/.bashrc"]

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]