pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "jenkins-kubernetes-cicd"
        DOCKERHUB_USERNAME = credentials("dockerhub-username")
        DOCKERHUB_PASSWORD = credentials("dockerhub-password")
    }
    stages {
        stage("1. Build Docker Image") {
            steps {
                echo "1. Build Docker Image"
                sh "docker build -t ${env.DOCKER_IMAGE}:${env.BUILD_ID} ."
            }
        }
        stage("2. Deploy Docker Image to DockerHub") {
            steps {
                echo "2. Deploy Docker Image to DockerHub"
                sh "docker login -u ${env.DOCKERHUB_USERNAME} -p ${env.DOCKERHUB_PASSWORD}"
                sh "docker push ${env.DOCKER_IMAGE}:${env.BUILD_ID}"
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying..."
            }
        }
    }
}
