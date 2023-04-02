pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials("DockerHub")
        DOCKER_IMAGE_NAME = "jenkins-kubernetes-cicd"
        DOCKER_IMAGE_TAG = "latest"
        DOCKER_IMAGE = "${DOCKERHUB_CREDENTIALS_USR}/${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}"
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
                script {
                    docker.withRegistry("", "${env.DOCKERHUB_CREDENTIALS}") {
                        docker.image("${env.DOCKER_IMAGE}").push()
                    }
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
