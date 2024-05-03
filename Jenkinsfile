pipeline {
  environment {
    imagename = "botirkhuja/namecheap-ddns"
    registryCredential = 'docker-botirkhuja-password'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/botirkhuja/ddns-namecheap-client', branch: 'main')
      }
    }

    stage('Build') {
      parallel {
        stage('List items') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Build DDNS') {
          steps {
            script {
              dockerImage = docker.build imagename
            }
          }
        }
      }
    }

    stage('Echo environment') {
      steps {
        echo "${env}"
      }
    }

    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("$BUILD_NUMBER")
            dockerImage.push('latest')
          }
        }
      }
    }

    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $imagename:$BUILD_NUMBER"
        sh "docker rmi $imagename:latest"
      }
    }
  }
}