pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "jenkins-kubernetes-cicd"
        DOCKER_IMAGE_TAG = "latest"
        DOCKER_IMAGE = "${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}"
    }
    stages {
        stage("1. Build Docker Image on Local Machine") {
            steps {
                echo "1. Build Docker Image on Local Machine"
                sh "docker build -t ${env.DOCKER_IMAGE} ."
            }
        }
        stage("2. Deploy Docker Image to DockerHub") {
            steps {
                echo "2. Deploy Docker Image to DockerHub"
                docker.withRegistry("https://hub.docker.com", "DockerHub") {
                    docker.image("${DOCKER_IMAGE}").push()
                }
            }
        }
        stage("3. Delete Docker Image on Local Machine") {
            steps {
                echo "3. Delete Docker Image on Local Machine"
                sh "docker rmi ${env.DOCKER_IMAGE}"
            }
        }
        // stage("4. Deploy Docker Image to Kubernetes Cluster") {
        //     agent { label "kOps" }
        //     steps {
        //         echo "4. Deploy Docker Image to Kubernetes Cluster"
        //         sh "docker "
        //     }
        // }
    }
}
