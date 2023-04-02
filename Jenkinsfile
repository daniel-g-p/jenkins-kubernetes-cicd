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
                sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                sh "docker push ${DOCKER_IMAGE}"
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
