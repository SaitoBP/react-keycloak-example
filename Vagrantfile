Vagrant.configure("2") do |config|
  config.vm.define "backend" do |backend|
    backend.vm.box = "bento/ubuntu-18.04"
    backend.vm.network "private_network", ip: "192.168.0.10"

    # Sends Docker Compose file from host to VM
    backend.vm.provision "docker-compose file", 
      type: "file", 
      source: "./backend/docker-compose.yml", 
      destination: "docker-compose.yml"

    # Setup Docker and Docker-Compose
    backend.vm.provision "setup", type: "shell", inline: <<-SHELL
      # Updates System
      apt update
      apt upgrade -y

      # Install Dependencies
      apt-get install curl apt-transport-https ca-certificates software-properties-common -y

      # Add GPG Key
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

      # Add Docker Repository
      add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

      # Update Repository Info
      apt update

      # Install Docker Ubuntu 18.04
      apt install docker-ce -y

      # Download Docker Compose
      curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

      # Apply Executable Permission to the Binary
      chmod +x /usr/local/bin/docker-compose

      # Add User to Docker Group
      usermod -aG docker $USER
    SHELL

    # Run Docker
    backend.vm.provision "compose", type: "shell", run:"always", inline: <<-SHELL
      docker-compose up -d
    SHELL
  end

  config.vm.define "frontend" do |frontend|
    frontend.vm.box = "bento/ubuntu-18.04"
    frontend.vm.network "private_network", ip: "192.168.0.20"
    
    # Send ngixConfig from host to VM
    frontend.vm.provision "nginx config", 
      type: "file", 
      source: "./frontend/nginx.conf", 
      destination: "/tmp/react-client"
    
    # Send Build folder from host to VM
    frontend.vm.provision "build", 
      type: "file", 
      source: "./frontend/build", 
      destination: "build"

    # Setup Nginx
    frontend.vm.provision "setup", type:"shell", inline: <<-SHELL
      # Updates System
      apt update
      apt upgrade -y
      
      # Install Nginx
      apt install nginx -y

      # Allow firewall of VM
      ufw allow 'Nginx HTTP'

      # Move from tmp to nginx
      mv /tmp/react-client /etc/nginx/sites-available/react-client

      # Link from sites-available to sites-enabled
      ln -s /etc/nginx/sites-available/react-client /etc/nginx/sites-enabled
      systemctl restart nginx

      # Remove default from sites-enabled
      rm /etc/nginx/sites-enabled/default
    SHELL
  end
end
