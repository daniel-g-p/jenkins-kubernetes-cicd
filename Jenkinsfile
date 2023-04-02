pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "jenkins-kubernetes-cicd"
        DOCKER_IMAGE_TAG = "${env.BUILD_ID}"
        DOCKER_IMAGE = "${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}"
        DOCKERHUB_CREDENTIALS = credentials("DockerHub")
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
                sh "docker login -u ${env.DOCKERHUB_CREDENTIALS_USR} -p ${env.DOCKERHUB_CREDENTIALS_PSW}"
                sh "docker push ${env.DOCKER_IMAGE}"
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
